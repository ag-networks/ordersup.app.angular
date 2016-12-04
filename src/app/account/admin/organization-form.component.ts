import { Component, Input, EventEmitter, Injector } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { Subscription }   from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AppConfigService } from '../../common/services/app-config.service';
import { AccountPageService } from '../account-page.service';
import { Organization } from '../../common/models/organization';

@Component({
  selector: 'organization-form',
  providers: [],
  template: require('./organization-form.html'),
  styleUrls: [ './organization-form.scss' ]
})
export class OrganizationFormComponent {

  /* form tutorial
   https://github.com/angular-university/courses/blob/master/01-getting-started-with-angular2/src/forms-model-driven/app.ts
   https://angular-university.io/lesson/angular2-set-form-value-reset-form
   */
  private appConfig: any;
  private accountPageSvc: any;
  private user:any;
  sub: Subscription;

  @Input() id: any;

  private organization = new Organization(
    "Acme Widgets, LLC",
    "Technology",
    "2016",
    "1-10 Employees",
    "14",
    "bob.smith@acmewidgets.com",
    "http://www.acmewidgets.com",
    "1234 Main St",
    "Atlanta",
    "GA",
    "30309"
  );


  form: FormGroup;
  name = new FormControl("", Validators.required);
  industry = new FormControl("", Validators.required);
  sub_industry = new FormControl("", this.notRequiredValuePresenceValidator);
  year_founded = new FormControl("", Validators.required);
  company_size = new FormControl("", Validators.required);
  number_of_locations = new FormControl("", Validators.required);
  address_line_1 = new FormControl("", Validators.required);
  address_line_2 = new FormControl("");
  city = new FormControl("", Validators.required);
  state = new FormControl("", Validators.required);
  zipcode = new FormControl("", Validators.required);
  country = new FormControl({value:"United States",disabled: true});
  email_address = new FormControl("", Validators.required);
  phone_number = new FormControl("");
  fax_number = new FormControl("");
  website = new FormControl("", Validators.required);

  facebook_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  linkedin_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  twitter_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  instagram_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  snapchat_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  youtube_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  vimeo_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));
  pinterest_link = new FormControl("", Validators.compose([this.notRequiredValuePresenceValidator]));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    fb: FormBuilder) {
    console.log("Organization Form : Constructor");
    this.appConfig = injector.get(AppConfigService);
    this.accountPageSvc = injector.get(AccountPageService);
    this.initForm(fb);

    /*
    this.form.valueChanges
      .filter(() => this.form.valid)
      .map(value => new Organization(
        value.name,
        value.industry,
        value.company_size,
        value.number_of_locations,
        value.email_address,
        value.website,
        value.address_line_1,
        value.city,
        value.state,
        value.zipcode))
      .do(formValue => console.log("Valid Form Value:", formValue))
      .subscribe(
        organization => this.organization = organization
      );
    */


    this.form.valueChanges
      .map(value => new Organization(
        value.name,
        value.industry,
        value.company_size,
        value.number_of_locations,
        value.email_address,
        value.website,
        value.address_line_1,
        value.city,
        value.state,
        value.zipcode,
        '','','','','','','','','','','','','',''))
      .do(formValue => console.log("Valid Form Value:", formValue))
      .subscribe(
        organization => this.organization = organization
      );



  }

  initForm(fb) {
    this.form = fb.group({
      "name": this.name,
      "industry": this.industry,
      "sub_industry": this.sub_industry,
      "year_founded": this.year_founded,
      "company_size": this.company_size,
      "number_of_locations": this.number_of_locations,
      "address_line_1": this.address_line_1,
      "address_line_2": this.address_line_2,
      "city": this.city,
      "state": this.state,
      "zipcode": this.zipcode,
      "country": this.country,
      "email_address": this.email_address,
      "phone_number": this.phone_number,
      "fax_number": this.fax_number,
      "website": this.website,
      "facebook_link": this.facebook_link,
      "linkedin_link": this.linkedin_link,
      "twitter_link": this.twitter_link,
      "instagram_link": this.instagram_link,
      "snapchat_link": this.snapchat_link,
      "youtube_link": this.youtube_link,
      "vimeo_link": this.vimeo_link,
      "pinterest_link": this.pinterest_link
      //"password":["", Validators.required]
    });
  }

  onSubmitModelBased() {
    console.log("model-based form submitted");
    console.log(this.form);
  }


  fullUpdate() {
    this.form.patchValue({firstName: 'Partial', password: 'monkey'});
  }

  partialUpdate() {
    this.form.patchValue({firstName: 'Partial'});
  }

  reset() {
    this.form.reset();
  }

  notRequiredValuePresenceValidator(control: FormControl): { [s: string]: boolean } {
    if(control.value != "") {
      return { ["hasValue"]: true }
    } //else {
  }
}
