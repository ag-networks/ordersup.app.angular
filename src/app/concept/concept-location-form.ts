import { Component, Input, Output, EventEmitter, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Concept } from './concept';
import { ConceptLocation } from './concept-location';
import { ConceptService } from '../common/services/concept.service';
import { AppConfigService } from '../common/services/app-config.service';


@Component({
  selector: 'concept-location-form',
  template: require('./concept-location-form.html'),
  styleUrls: [ './concept-location-form.scss' ],
})
export class ConceptLocationForm {

  active = true;

  model = new ConceptLocation(null,null,null,'','','','','','','');

  private appConfigSvc: any;
  private conceptSvc: any;
  @Input() concept_id:number = null;
  @Input() owner_id:number = null;
  @Output() addedLocation = new EventEmitter<string>();

  loc_form: FormGroup;
  name = new FormControl("", Validators.required);
  store_code:any;
  address1 = new FormControl("", Validators.required);
  //address2 = new FormControl("", Validators.required);
  city = new FormControl("", Validators.required);
  state = new FormControl("", Validators.required);
  zipcode = new FormControl("", Validators.required);


  constructor(
    fb: FormBuilder,

    private injector: Injector) {

    this.appConfigSvc = injector.get(AppConfigService);
    this.conceptSvc = injector.get(ConceptService);

    //this.store_code = new FormControl("",
    //  [ Validators.required,
    //    (control:FormControl) => {
    //      return this.checkStoreCode(control,this.conceptSvc);
    //    }
    //  ]);


    this.store_code = new FormControl("",
      Validators.required,
      //[
        (control:FormControl) => {
          return this.checkStoreCode(control,this.conceptSvc);
        }
      //]
  );



/*
    this.store_code = new FormControl("",
      [Validators.required],
      [(control:FormControl) => {
          return this.checkStoreCode(control,this.conceptSvc);
        }
      ]
      );

    this.store_code = new FormControl("",
      [Validators.required],
      [(control:FormControl) => {
        return this.checkStoreCode(control,this.conceptSvc);
      }
      ]
    );
    */

    //this.store_code = new FormControl(
    //  "",
    //  [Validators.required],[this.checkStoreCode.bind(this)]);


    /*
    this.loc_form = new FormGroup({
      "name": this.name,
      "store_code": this.store_code,
      "address1": this.address1,
      //"address2": this.address2,
      "city": this.city,
      "state": this.state,
      "zipcode": this.zipcode
    });
    */

    this.loc_form = fb.group({
      "name": this.name,
      "store_code": this.store_code,
      "address1": this.address1,
      //"address2": this.address2,
      "city": this.city,
      "state": this.state,
      "zipcode": this.zipcode
    });

    this.loc_form.valueChanges
      .subscribe(
        data => {
          this.model.name = data.name;
          this.model.store_code = data.store_code;
          this.model.address1 = data.address1;
          //this.model.address2 = data.address2;
          this.model.city = data.city;
          this.model.state = data.state;
          this.model.zipcode = data.zipcode;
        }
      );
  }

  ngOnInit() {
    this.model.concept_id = this.concept_id;
    this.model.owner_id = this.owner_id;
  }

  ngAfterViewInit() {

  }

  saveLoc() {

    if(this.concept_id == null) return;
    if(this.owner_id == null) return;

    var data = {
      concept_location : {
        concept_id:this.model.concept_id,
        concept_owner_id:this.model.owner_id,
        name:this.model.name,
        store_code:this.model.store_code,
        address1:this.model.address1,
        //address2:this.model.address2,
        city:this.model.city,
        state:this.model.state,
        zipcode:this.model.zipcode
      }
    }

    this.conceptSvc.addLocation(data).subscribe(
      (resp) => {
        this.addedLocation.emit(JSON.parse(resp.text()));
        this.model = new ConceptLocation(null,this.concept_id,this.owner_id,'','','','','','','');
        this.loc_form.reset();
      },
      (err) => {
        console.error(err);
        console.error(err.text());
        alert("There was a problem saving your location, please contact support.");
      }
    );
  }

  // https://auth0.com/blog/angular2-series-forms-and-custom-validation/
  // http://stackoverflow.com/questions/38801960/angular-2-form-async-validation-ajax-call-on-every-keypress
  private timeout;
  //checkStoreCode(formControl: FormControl,svc:ConceptService) : { [s: string]: boolean } {
  //checkStoreCode(formControl: FormControl,svc:ConceptService): {[key: string]: any} {
  //checkStoreCode(formControl: FormControl,svc:ConceptService): Promise<any> {
  //checkStoreCode(formControl: FormControl,svc:ConceptService): Promise<any> {
  //checkStoreCode(formControl: FormControl,svc:ConceptService): Promise<{[key: string]: any}> {
  //checkStoreCode(formControl: FormControl,svc:ConceptService) {
  checkStoreCode(formControl: FormControl,svc:ConceptService): any {
  //checkStoreCode(formControl: FormControl) {

    //if(formControl.value == "") {
    //  return null;
    //}

    //clearTimeout(this.timeout);

    if(!formControl){
      return null;
    }

    console.log(formControl);
    console.log(formControl.value);
    console.log(formControl.errors);


    //return new Promise((resolve, reject) => {
    //return new Promise(resolve => {
    const promise = new Promise(resolve => {
      //this.timeout = setTimeout(() => {
        this.conceptSvc.validateStoreCode(formControl.value)
          .subscribe(
            (response) => {
              console.log("respons",response);
              //response => resolve({"storeCodeShouldBeUnique": true}),
              resolve({["storeCodeShouldBeUnique"]: true})
            },
            (error)    => {
              console.log("error",error);
              resolve(null)
            }
          );
      //}, 600);
    });

    /*
    const promise = new Promise(resolve => {
      //return new Promise(resolve => {
      //new Promise(resolve => {
        svc.validateStoreCode(formControl.value).subscribe(
          (resp) => resolve({
              ["storeCodeShouldBeUnique"]: true
            }),
          (err) => resolve(null)
        );
      });


     return new Promise(resolve => {

     svc.validateStoreCode(formControl.value).subscribe(
     (resp) => {
     console.log("exists");
     resolve({
     ["usernameShouldBeUnique"]: true
     })
     },
     (err) => {
     resolve(null);
     }
     );
     });
     */
    return promise;
  }



}
