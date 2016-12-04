import { Component, Input, ViewChild, Injector } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Concept } from './concept';
import { ConceptOwner } from './concept-owner';
import { ConceptLocationForm } from './concept-location-form';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { ConceptService } from '../common/services/concept.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'concept-owner-details',
  providers: [
    ConceptService,
    FileUploadService
  ],
  template: require('./concept-owner-details.html'),
  styleUrls: [ './concept-owner-details.scss' ]

})
export class ConceptOwnerDetails {

  private appConfigSvc: any;
  private authSvc: any;
  private conceptSvc: any;
  private fileUploadSvc: any;

  private isLoggedIn: boolean = false;
  private sub1: any;
  private sub2: any;
  private user:any;
  private owner:ConceptOwner;

  // menu upload
  private showFileUpload = false;
  private filesToUpload: any;
  private upload_fg: FormGroup;
  private filename_fc = new FormControl("", [Validators.required]);
  private is_active_fc = new FormControl(false);


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
      "filename_fc": this.filename_fc,
      "is_active_fc": this.is_active_fc
    });

    console.log("Concept Owner Details : Constructor : user => ",this.user);

  }

  ngOnInit() {
    console.log('Concept Owner Details : ngOnInit()');
    if(this.isLoggedIn && this.user != null) {
      this.sub1 = this.route.params.subscribe(params => {
        this.getConceptOwner(params['id']);
      });
    }
  }

  ngOnDestroy() {
    console.log('Concept Owner Details : ngOnDestroy()');
    if(this.sub1)
      this.sub1.unsubscribe();

    if(this.sub2)
      this.sub2.unsubscribe();
  }

  getConceptOwner(id: string) {
    console.log("Concept Owner Details : getting concept owner",id);

    this.conceptSvc.getOwner(id).subscribe(resp => {
      console.log("Concept Owner Details in resp => ",resp);
      this.owner = JSON.parse(resp.text());
      console.log("Concept Owner Details  => ",this.owner);

    });
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Concept Owner Details : onAuthStateChange() : loggedIn",loggedIn);
    this.isLoggedIn = loggedIn;
    if(!loggedIn) {
    }
  }

  updateLocations(data:any) {
    console.log("Concept Owner Details : updateLocations()",data);
    this.owner.locations.push(data);
  }


  setFile(event:any) {
    console.log("Concept Owner Details : setFile()",event);
    this.filesToUpload = event.srcElement.files;
  }

  uploadMenu() {
    console.log("Concept Owner Details : uploadMenu()");
    var files = this.filesToUpload;
    console.log(files);

    console.log("this filename is ",this.filename_fc.value);
    console.log("this active is ",this.is_active_fc.value);

    let result: any;

    this.fileUploadSvc.getObserver()
      .subscribe(progress => {
        //this.uploadProgress = progress;
        console.log("Concept Owner Details : upload progress ",progress);
      });

    try {
      var url = this.appConfigSvc.api_base_url + '/v1/concept_owners/'+this.owner.id+'/menus/upload';
      this.fileUploadSvc.upload(url,this.filename_fc.value, this.is_active_fc.value, files).then( resp => {
        console.log("Concept Owner Details : UPLOAD RESP",resp);
        this.owner.menus.unshift(resp);
      });
    } catch (error) {
      console.error("Concept Owner Details : ERROR : ",error);
    }
  }

}
