import { Component, Input, Output, EventEmitter, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConceptLocationUser } from './concept-location-user';
import { ConceptService } from '../common/services/concept.service';
import { AppConfigService } from '../common/services/app-config.service';

@Component({
  selector: 'concept-location-user-form',
  template: require('./concept-location-user-form.html'),
  styleUrls: [ './concept-location-user-form.scss' ],
})
export class ConceptLocationUserForm {

  model = new ConceptLocationUser(null,null,'','','','');

  private appConfigSvc: any;
  private conceptSvc: any;
  private submitted = false;
  @Input() location_id:number = null;
  @Output() addedUser = new EventEmitter<string>();

  user_form: FormGroup;
  first_name = new FormControl("", Validators.required);
  last_name = new FormControl("", Validators.required);
  username = new FormControl("", Validators.required);
  pin = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);
  phone = new FormControl("", Validators.required);

  constructor(
              private injector: Injector) {

    console.log("Concept Location User Form : constructor()");
    this.appConfigSvc = injector.get(AppConfigService);
    this.conceptSvc = injector.get(ConceptService);

    this.user_form = new FormGroup({
      "first_name": this.first_name,
      "last_name": this.last_name,
      "username":this.username,
      "pin": this.pin,
      "email": this.email,
      "phone": this.phone
    });

    this.user_form.valueChanges
      .subscribe(
        data => {
          this.model.first_name = data.first_name;
          this.model.last_name = data.last_name;
          this.model.username = data.username;
          this.model.pin = data.pin;
          this.model.email = data.email;
          this.model.phone = data.phone;
        }
      );
  }

  ngOnInit() {
    this.model.concept_location_id = this.location_id;
  }

  ngAfterViewInit() {

  }

  saveUser() {

    if(this.location_id == null) return;

    var data = {
      concept_location_user : {
        concept_location_id:this.model.concept_location_id,
        first_name:this.model.first_name,
        last_name:this.model.last_name,
        username:this.model.username,
        pin:this.model.pin,
        password:this.model.pin,
        password_confirmation:this.model.pin,
        email:this.model.email,
        phone:this.model.phone
      }
    }

    this.conceptSvc.addLocationUser(data).subscribe(
      (resp) => {
        console.log("Concept Location User Form : resp",resp);
        this.addedUser.emit(JSON.parse(resp.text()));
        this.model = new ConceptLocationUser(null,this.location_id,'','','','');
        this.user_form.reset();
      },
      (err) => {
        console.error(err);
        console.error(err.text());
        alert("There was a problem saving your user, please contact support.");
      }
    );
  }

}
