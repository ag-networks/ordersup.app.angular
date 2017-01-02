import { Component, Input, ViewChild, Injector } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
import { Concept } from './concept';
import { ConceptOwner } from './concept-owner';
import { ConceptLocation } from './concept-location';
import { ConceptLocationUserForm } from './concept-location-user-form';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { ConceptService } from '../common/services/concept.service';
import { MenuService } from '../common/services/menu.service';
import { FileUploadService } from '../common/services/file-upload.service';
import { ReactiveFormsModule } from "@angular/forms";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MenuDetailsComponent } from '../menu/menu-details.component';

@Component({
  selector: 'concept-location-details',
  providers: [
    ConceptService,
    MenuService,
    FileUploadService
  ],
  styleUrls: [ './concept-location-details.scss' ],
  template: require('./concept-location-details.html')
})
export class ConceptLocationDetails {

  private appConfigSvc: any;
  private fileUploadService: any;
  private authSvc: any;
  private isLoggedIn: boolean = false;
  private sub1: any;
  private sub2: any;
  private user:any;
  private location:ConceptLocation;
  private owner:ConceptOwner;
  private filesToUpload: any;

  @ViewChild('menuDetails') menuDetails;

  private upload_fg: FormGroup;
  private filename_fc = new FormControl("", [Validators.required]);

  private active_menu_fg: FormGroup;
  private active_menu_fc = new FormControl("", [Validators.required]);

  constructor(
    private conceptSvc: ConceptService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    fb: FormBuilder) {

    this.appConfigSvc = injector.get(AppConfigService);
    this.fileUploadService = injector.get(FileUploadService);
    this.authSvc = injector.get(AuthenticationService);

    this.isLoggedIn = this.authSvc.isAuthenticated();
    this.user = this.appConfigSvc.getUser();

    this.sub2 = this.appConfigSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});

    console.log("Concept Location Details : Constructor : user => ",this.user);

    this.upload_fg = new FormGroup({
      "filename_fc": this.filename_fc
    });

    this.active_menu_fg = fb.group({
      "active_menu_fc": this.active_menu_fc
    });



  }

  ngOnInit() {
    console.log('Concept Location Details : ngOnInit()');
    if(this.isLoggedIn && this.user != null) {
      this.sub1 = this.route.params.subscribe(params => {
        this.getLocation(params['id']);
      });
    }
  }

  ngOnDestroy() {
    console.log('Concept Location Details : ngOnDestroy()');
    if(this.sub1)
      this.sub1.unsubscribe();

    if(this.sub2)
      this.sub2.unsubscribe();
  }

  getLocation(id: string) {
    console.log("Concept Location Details : getting location ",id);

    this.conceptSvc.getLocation(id).subscribe(resp => {
      this.location = JSON.parse(resp.text());

      if(this.location.menu) {
        this.active_menu_fg.controls['active_menu_fc'].setValue(this.location.menu.id);
      }

      if(this.location.menu_id) {
        this.menuDetails.getMenu(this.location.menu_id);
        this.active_menu_fc.patchValue(this.location.menu_id);
      }

      this.active_menu_fc.valueChanges.subscribe(
        data => {
            console.log("active_menu_fc : valueChanges : data",data);
            this.changeActiveMenu(data);
        }
      );
      console.log("Concept Location Details : got location",this.location);
    });
  }

  getMenu(id: string) {
    console.log("Concept Location Details : getMenu()",id);

    this.menuService.get(id).subscribe(resp => {
      this.location = JSON.parse(resp.text());
    });
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Concept Location Details : onAuthStateChange() : loggedIn",loggedIn);
    this.isLoggedIn = loggedIn;
    if(!loggedIn) {
    }
  }

  updateUsers(data:any) {
    console.log("Concept Location Details : updateLocations()",data);
    this.location.users.push(data);
  }

  setFile(event:any) {
    console.log("Concept Location Details : setFile()",event);
    this.filesToUpload = event.srcElement.files;
  }

  uploadMenu() {
    console.log("Concept Location Details : uploadMenu()");
    var files = this.filesToUpload;
    console.log(files);

    console.log("this filename is ",this.filename_fc.value);

    let result: any;

    this.fileUploadService.getObserver()
      .subscribe(progress => {
        //this.uploadProgress = progress;
        console.log("upload progress ",progress);
      });

    try {
      var url = this.appConfigSvc.api_base_url + '/v1/concept_locations/'+this.location.id+'/menus/upload';
      this.fileUploadService.upload(url,this.filename_fc.value, files).then( resp => {
        console.log("UPLOAD RESP",resp);
        this.location.menus.unshift(resp);
      });
    } catch (error) {
      console.error("ERROR : ",error);
    }
  }

  changeActiveMenu(menu_id:number) {
    console.log("Concept Location Details : changeActiveMenu() owner[" + this.location.owner.id + "] loc[" + this.location.id + " menu[" + menu_id+ "]");

    this.conceptSvc.activateOwnerLocationMenu(this.location.owner.id,this.location.id,menu_id).subscribe(resp => {
      this.location.menu = JSON.parse(resp.text());
      this.menuDetails.getMenu(menu_id);
      console.log("Concept Owner Details : changeActiveMenu() : resp  => ",resp);
    });
  }

  locationMenuJson() {
    return JSON.stringify(this.location.menu);
  }

}
