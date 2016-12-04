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


@Component({
  selector: 'admin-user-form',
  providers: [],
  template: require('./admin-user-form.html'),
  styleUrls: [ './admin-user-form.scss' ]
})
export class AdminUserFormComponent {

  private appConfig: any;
  private accountPageSvc: any;
  private user:any;

  form: FormGroup;

  email_address = new FormControl("", Validators.required);
  first_name = new FormControl("", Validators.required);
  last_name = new FormControl("", Validators.required);
  title = new FormControl("", Validators.required);
  phone_number = new FormControl("", this.notRequiredValuePresenceValidator);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector,
    fb: FormBuilder) {
    console.log("Admin User Form : Constructor");
    this.appConfig = injector.get(AppConfigService);
    this.accountPageSvc = injector.get(AccountPageService);
    this.initForm(fb);
  }

  initForm(fb) {
    this.form = fb.group({
      "email_address": this.email_address,
      "first_name": this.first_name,
      "last_name": this.last_name,
      "title": this.title,
      "phone_number": this.phone_number,
    });
  }

  onSubmitModelBased() {
    console.log("model-based form submitted");
    console.log(this.form);
  }


  fullUpdate() {
    //this.form.patchValue({firstName: 'Partial', password: 'monkey'});
  }

  partialUpdate() {
    //this.form.patchValue({firstName: 'Partial'});
  }

  reset() {
    this.form.reset();
  }


  notRequiredValuePresenceValidator(control: FormControl): { [s: string]: boolean } {
    if(control.value != "") {
      return { ["hasValue"]: true }
    }
  }

}
