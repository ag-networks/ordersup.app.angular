import { Component, Input, Output, EventEmitter, ViewChild, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConceptOwner } from './concept-owner';
import { ConceptService } from '../common/services/concept.service';
import { AppConfigService } from '../common/services/app-config.service';

@Component({
  selector: 'concept-owner-form',
  providers: [
    AppConfigService,
    ConceptService
  ],
  template: require('./concept-owner-form.html'),
  styleUrls: [ './concept-owner-form.scss' ]
})
export class ConceptOwnerForm {

  model = new ConceptOwner(null,null,'','','','','');

  private appConfigSvc: any;
  private conceptSvc: any;
  @Input() concept_id:number = null;
  @Output() addedOwner = new EventEmitter<string>();

  owner_form: FormGroup;
  organization_name = new FormControl("", Validators.required);
  first_name = new FormControl("", Validators.required);
  last_name = new FormControl("", Validators.required);
  phone = new FormControl("", Validators.required);
  email = new FormControl("", Validators.required);

  constructor(
              private injector: Injector) {

    this.appConfigSvc = injector.get(AppConfigService);
    this.conceptSvc = injector.get(ConceptService);

    this.owner_form = new FormGroup({
      "organization_name": this.organization_name,
      "first_name": this.first_name,
      "last_name": this.last_name,
      "phone": this.phone,
      "email": this.email
    });

    this.owner_form.valueChanges
      .subscribe(
        data => {
          this.model.organization_name = data.organization_name;
          this.model.first_name = data.first_name;
          this.model.last_name = data.last_name;
          this.model.phone = data.phone;
          this.model.email = data.email;
        }
      );

  }

  ngOnInit() {
    this.model.concept_id = this.concept_id;
  }

  ngAfterViewInit() {

  }

  saveOwner() {

    if(this.concept_id == null) return;

    var data = {
      concept_owner : {
        concept_id:this.model.concept_id,
        organization_name:this.model.organization_name,
        first_name:this.model.first_name,
        last_name:this.model.last_name,
        phone:this.model.phone,
        email:this.model.email
      }
    }

    this.conceptSvc.addOwner(data).subscribe(
      (resp) => {
        console.log("Concept Owner Form : resp",resp);
        this.addedOwner.emit(JSON.parse(resp.text()));
        this.model = new ConceptOwner(null,this.concept_id,'','','','','');
        this.owner_form.reset();
      },
      (err) => {
        console.error(err);
        console.error(err.text());
        alert("There was a problem saving your concept owner, please contact support.");
      }
    );
  }
}
