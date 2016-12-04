import { Component, Input, ViewChild, Injector } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Concept } from './concept';
import { ConceptOwnerForm } from './concept-owner-form';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { ConceptService } from '../common/services/concept.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'concept-details',
  providers: [
    ConceptService,
    FileUploadService
  ],
  template: require('./concept-details.html'),
  styleUrls: [ './concept-details.scss' ]
})
export class ConceptDetails {

  private appConfigSvc: any;
  private authSvc: any;
  private conceptSvc: any;
  private fileUploadSvc: any;

  private isLoggedIn: boolean = false;
  private sub1: any;
  private sub2: any;
  private user:any;
  @Input() concept: Concept;
  private filesToUpload: any;

  private upload_fg: FormGroup;
  private filename_fc = new FormControl("", [Validators.required]);



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector) {

    this.appConfigSvc = injector.get(AppConfigService);
    this.authSvc = injector.get(AuthenticationService);
    this.conceptSvc = injector.get(ConceptService);
    this.fileUploadSvc = injector.get(FileUploadService);

    this.isLoggedIn = this.authSvc.isAuthenticated();
    this.user = this.appConfigSvc.getUser();

    this.sub2 = this.appConfigSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});

    this.upload_fg = new FormGroup({
      "filename_fc": this.filename_fc
    });

    console.log("Concept Details : Constructor : user => ",this.user);

  }

  ngOnInit() {
    console.log('Concept Details : ngOnInit()');
    if(this.isLoggedIn && this.user != null) {
      this.sub1 = this.route.params.subscribe(params => {
        this.getConcept(params['id']);
      });
    }
  }

  ngOnDestroy() {
    console.log('Concept Details : ngOnDestroy()');
    this.sub1.unsubscribe();
    if(this.sub1)
      this.sub1.unsubscribe();

    if(this.sub2)
      this.sub2.unsubscribe();
  }

  getConcept(id: string) {
    console.log("Concept Details : getting concept ",id);

    this.conceptSvc.get(id).subscribe(resp => {
      console.log("Concept Details in resp => ",resp);
      this.concept = JSON.parse(resp.text());
      //if(this.concept.user.id == this.user.id) {
      //  this.myPost = true;
      //}
    });
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Concept Details : onAuthStateChange() : loggedIn",loggedIn);
    this.isLoggedIn = loggedIn;
    if(!loggedIn) {
    }
  }

  updateLocations(data:any) {
    console.log("Concept Details : updateLocations()",data);
    this.concept.locations.push(data);
  }

  updateOwners(data:any) {
    console.log("Concept Details : updateOwners()",data);
    this.concept.owners.push(data);
  }

  setFile(event:any) {
    console.log("Concept Details : setFile()",event);
    this.filesToUpload = event.srcElement.files;
  }

  uploadMenu() {
    console.log("Concept Details : uploadMenu()");
    var files = this.filesToUpload;
    console.log(files);

    console.log("Concept Details : uploadMenu() : this filename is ",this.filename_fc.value);

    let result: any;

    this.fileUploadSvc.getObserver()
      .subscribe(progress => {
        //this.uploadProgress = progress;
        console.log("upload progress ",progress);
      });

    try {
      var url = this.appConfigSvc.api_base_url + '/v1/concepts/'+this.concept.id+'/menus/upload';
      this.fileUploadSvc.upload(url,this.filename_fc.value, files).then( resp => {
        console.log("UPLOAD RESP",resp);
        //this.location.menus.unshift(JSON.parse(resp));
        this.concept.menus.unshift(resp);
      });
    } catch (error) {
      console.error("ERROR : ",error);
    }
  }

}
