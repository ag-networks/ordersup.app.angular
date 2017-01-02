import { Component, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { ConceptService } from '../common/services/concept.service';
//import { ComponentsHelper } from 'ng2-bootstrap/ng2-bootstrap'
//import { ModalDirective  } from 'ng2-bootstrap/components/modal/modal.component';
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap';
//import { ModalDirective  } from 'ng2-bootstrap/components/modal';
//import { Modal  } from 'ng2-bootstrap/components/modal/modal.component';

//import { CalendarPipe } from 'angular2-moment';


@Component({
  selector: 'concept',
  providers: [
  ],
  //pipes: [ CalendarPipe ],
  styleUrls: [ './concept.scss' ],
  template: require('./concept.html')
})
export class ConceptComponent {

  private appCfgSvc: any;
  private authSvc: any;
  private conceptSvc: any;
  private isLoggedIn: boolean = false;
  private sub1: any;
  private sub2: any;
  private user:any;
  private concepts:Array<any> = [];
  private concept = {
    name:"sdf",
    description:"sdf"
  }

  concept_form: FormGroup;
  concept_name = new FormControl("", Validators.required);
  concept_description = new FormControl("", Validators.required);

  @ViewChild('removeModal') public removeModal:ModalDirective;
  private conceptIdToDelete;


  constructor(
    private injector: Injector) {
    console.log("Concept : CONSTRUCTOR");

    this.appCfgSvc = injector.get(AppConfigService);
    this.authSvc = injector.get(AuthenticationService);
    this.conceptSvc = injector.get(ConceptService);


    this.isLoggedIn = this.authSvc.isAuthenticated();
    this.user = this.appCfgSvc.getUser();
    if(this.isLoggedIn && this.user != null) {
      this.conceptSvc.getAll().subscribe(
      resp => {
        this.concepts = JSON.parse(resp.text());
      },
      err  => {
        console.error("Concept : error retrieving concepts",err)
      });

    }
    //this.sub1 = appCfgSvc.userUpdated.subscribe(
    //  user => this.onUserUpdated(user),
    //  err  => { console.error("isAuthenticatedError",err)});

    this.sub2 = this.appCfgSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});

    this.concept_form = new FormGroup({
      "name": this.concept_name,
      "description": this.concept_description
    });

    this.concept_form.valueChanges
      .subscribe(
        data => {
          this.concept.name = data.name;
          this.concept.description = data.description;
        }
      );
  }

  ngOnInit() {
    console.log('Concept : ngOnInit()');
  }

  ngOnDestroy() {
    console.log('Concept : ngOnDestroy()');
    //this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    //this.appCfgSvc.userUpdated.unsubscribe();
    //this.appCfgSvc.authStateChange.unsubscribe();
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Concept : onAuthStateChange() : loggedIn",loggedIn);
    this.isLoggedIn = loggedIn;
    if(!loggedIn) {
    }
  }

  addConcept(name:string,description:string) {
    //var name = event.target.value;
    console.log("Concept : addComment()",name,description);

    var data = {name:this.concept_name.value,description:this.concept_description.value};
    this.conceptSvc.addConcept(data).subscribe(resp => {
        console.log("Concept : in resp => ",resp);
        //event.target.value = "";
        this.concepts.push(JSON.parse(resp.text()));
        this.concept_form.reset();
        //this.analyticsSvc.trackPostCommentEvent(String(this.contentPost.id),'');
      },
      err => {
        console.error("ERROR",err);
        alert("you must sign in to comment on posts");
      });
  }

  public removeConcept() {
    if(!this.conceptIdToDelete)
      return;

    this.conceptSvc.deleteConcept(this.conceptIdToDelete).subscribe(resp => {
        this.conceptIdToDelete = null;
        this.hideRemoveConceptModal();
      },
      err => {
        console.error("ERROR",err);
        alert("There was a problem deleting the concept.  Please contact support");
      });
  }

  public showRemoveConceptModal(id:string):void {
    console.log("Concept : showRemoveConceptModal()",id);
    if(id=="")
      return;

    this.conceptIdToDelete = id;
    this.removeModal.show();
  }

  public hideRemoveConceptModal():void {
    console.log("Concept : hideRemoveConceptModal()");
    this.conceptIdToDelete = null;
    this.removeModal.hide();
  }

}
