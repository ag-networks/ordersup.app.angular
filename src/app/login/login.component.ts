import { Component, Injector, EventEmitter } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { UserService } from '../common/services/user.service';
import { AnalyticsService } from '../common/services/analytics-service';
import { ReactiveFormsModule } from "@angular/forms";
import { FormGroup, FormControl, Validators } from '@angular/forms';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

export class Auth {
  constructor(
    public email: string,
    public password: string
  ) {  }
}

@Component({
  selector: 'login',
  providers: [],
  template: require('./login.html'),
  styleUrls: [ './login.scss' ]
})
export class Login {

  private authSvc: any;
  private appConfigSvc: any;
  private userSvc: any;
  private analyticsSvc: any;
  private authProvider: string = "";
  private loginError = false;

  private model = new Auth('','');
  private login_fg: FormGroup;
  private pw_fc = new FormControl("", [Validators.required]);
  private em_fc = new FormControl("", [Validators.required]);


  private user: any;

  localState: any;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private injector: Injector
  ) {

    this.authSvc = injector.get(AuthenticationService);
    this.appConfigSvc = injector.get(AppConfigService);
    this.userSvc = injector.get(UserService);
    this.analyticsSvc = injector.get(AnalyticsService);

    this.login_fg = new FormGroup({
      "pw_fc": this.pw_fc,
      "em_fc": this.em_fc
    });

  }

  ngOnInit() {
    /*
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });
    */
  }

  authenticate(provider: string) {
    console.log("Sign In : authenticating with " + provider);
    this.authProvider = provider;
    //this.showLoading = true;
    this.authSvc.authenticate(provider)
      .subscribe(
        () => this.authSuccess(),
        () => this.authFail()
      );
  }

  login() {
    console.log("Login : authenticating with ",this.authSvc);
    this.authSvc.login(this.model)
      .subscribe(
        () => this.authSuccess(),
        () => this.authFail()
      );
  }

  authSuccess() {
    console.log("Login : authSuccess()");
    this.loginError = true;
    //this.showLoading = false;
    this.getUser();
  }

  authFail() {
    console.error("Login : ERROR : authFail()");
    this.loginError = true;

    //this.showLoading = false;
    //this.onAuthFailure.emit("");
  }

  getUser() {

    var jwt = this.authSvc.getDecodedToken();
    console.log("Login : getUser() : " + jwt.user_id);
    this.userSvc.getUser(jwt.user_id).subscribe(
      resp => {
        this.appConfigSvc.updateUser(JSON.parse(resp.text()));
        //console.log("Sign In : GETTING/SETTING USER IN LOCALSTORAGE : in callback : res is ",this.user);

        this.appConfigSvc.updateAuthState(true);

        this.analyticsSvc.setUser(this.appConfigSvc.getUser());
        this.analyticsSvc.trackLogInEvent(this.authProvider);
        this.router.navigate(['/concepts']);
      });
  }

}
