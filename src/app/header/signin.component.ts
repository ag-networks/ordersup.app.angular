import { Component, Injector, ViewChild, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../common/services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../common/services/user.service';
import { AppConfigService } from '../common/services/app-config.service';
import { AnalyticsService } from '../common/services/analytics-service';

@Component({
  selector: 'signin',
  //providers: [UserService],
  //directives: [  ],
  //pipes: [ ],
  //styles: [ require('./signin.scss') ],
  styleUrls: [ require('./signin.scss') ],
  template: require('./signin.html')
})

export class Signin {

  private appConfigService: any;
  private analyticsSvc: any;
  private authenticationService: any;
  private showProfileMenu: boolean = false;
  private showLoading: boolean = false;
  private isLoggedIn: boolean = false;
  private isAdmin: boolean = false;
  private authProvider: string = "";
  private user:any = {};

  @Output() onAuthSuccess = new EventEmitter<string>();
  @Output() onAuthFailure = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private router: Router,
    private injector: Injector
  ) {
    console.log("Sign In : Constructor");

    this.appConfigService = injector.get(AppConfigService);
    this.authenticationService = injector.get(AuthenticationService);
    this.analyticsSvc = injector.get(AnalyticsService);

    this.appConfigService.userUpdated.subscribe(
      user => this.onUserUpdated(user),
      err  => { console.error("isAuthenticatedError",err)});

    this.appConfigService.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});

    if(this.isLoggedIn) {
      this.user = this.appConfigService.getUser();
      this.isAdmin = this.user.is_admin;
    }

  }

  authenticate(provider: string) {
    console.log("Sign In : authenticating with " + provider);
    this.authProvider = provider;
    this.showLoading = true;
    this.authenticationService.authenticate(provider)
      .subscribe(
        () => this.authSuccess(),
        () => this.authFail()
      );
  }

  authSuccess() {
    console.log("Sign In : authSuccess()");
    this.showLoading = false;
    this.getUser();
    this.onAuthSuccess.emit("");
  }

  authFail() {
    this.showLoading = false;
    this.onAuthFailure.emit("");
  }

  logout() {
    this.showProfileMenu = false;
    this.authenticationService.logout();
    this.router.navigate(['/home']);
    this.analyticsSvc.trackLogOutEvent(this.authProvider);
  }

  getUser() {

    var jwt = this.authenticationService.getDecodedToken();
    console.log("Sign In : getUser() : " + jwt.user_id);
    this.userService.getUser(jwt.user_id).subscribe(
      resp => {
        this.appConfigService.updateUser(JSON.parse(resp.text()));
        //console.log("Sign In : GETTING/SETTING USER IN LOCALSTORAGE : in callback : res is ",this.user);

        this.appConfigService.updateAuthState(true);

        this.analyticsSvc.setUser(this.user);
        this.analyticsSvc.trackLogInEvent(this.authProvider);
      });
  }

  onUserUpdated(user:any) {
    console.log("Sign In : onUserUpdated() ",user);
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Sign In : onAuthStateChange() : loggedIn",loggedIn);
    if(loggedIn) {
      this.user = this.appConfigService.getUser();
    }
    this.isLoggedIn = loggedIn;
  }

  getFontStyle() {
    var data = this.appConfigService.accent_styles.font_color;
    return data;
  }

}
