import { Component, ViewChild, Injector } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';
import { AnalyticsService } from '../common/services/analytics-service';
import { Signin } from './signin.component';
//import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
//import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ModalModule, Modal } from 'ng2-modal';
//import { POPOVER_DIRECTIVES, Popover } from "ng2-popover";
import { Popover } from "ng2-popover";
var $ = require('jquery');

@Component({
  selector: 'header',
  //providers: [
  //  AppConfigService,
  //  AuthenticationService
  //],
  //directives: [
  //  RouterLink,
  //  //POPOVER_DIRECTIVES,
  //  Popover,
  //  MODAL_DIRECTIVES,
  //  Signin ],
  //pipes: [ ],
  //styles: [ require('./header.scss') ],
  //styleUrls: [ require('./header.scss') ],
  styleUrls: [ './header.scss' ],
  //template: require('./header.html')
  templateUrl: './header.html'
})
export class Header {

  private appConfigSvc: any;
  private analyticsSvc: any;
  private authSvc: any;
  private showProfileMenu: boolean = false;
  private showLoading: boolean = false;
  private isLoggedIn: boolean = false;
  private isAdmin: boolean = false;
  private authProvider: string = "";
  private user:any = {};
  private isSalesbarVisible = false;


  //@ViewChild('loginModal') loginModal: ModalModule;
  @ViewChild('loginModal') loginModal: Modal;


  constructor(
    //private userService: UserService,
    private router: Router,
    private injector: Injector
  ) {
    console.log("Header : Constructor");

    this.appConfigSvc = injector.get(AppConfigService);
    this.authSvc = injector.get(AuthenticationService);
    this.analyticsSvc = injector.get(AnalyticsService);

    this.isLoggedIn = this.authSvc.isAuthenticated();

    this.appConfigSvc.userUpdated.subscribe(
      user => this.onUserUpdated(user),
      err  => { console.error("isAuthenticatedError",err)});

    this.appConfigSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err      => { console.error("authStateChange",err)});


    //this.appConfigSvc.salesbarUpdated.subscribe(content => {
    //  console.log("Sales Bar : update event detected .. updating content");
    //  this.content = this.sanitizer.bypassSecurityTrustHtml(content);
    //});

    if(this.isLoggedIn) {
      this.user = this.appConfigSvc.getUser();
      this.isAdmin = this.user.is_admin;
    }

  }


  authSuccess() {
    console.log("Header : authSuccess()");
    this.showLoading = false;
    this.loginModal.close();
  }

  authFail() {
    alert("Failed to authenticate");
    this.showLoading = false;
  }

  toggleLogin() {
    this.loginModal.open();
  }

  logout() {
    console.log("Header : logout()");
    this.authSvc.logout();
    this.router.navigate(['/login']);
    this.analyticsSvc.trackLogOutEvent(this.authProvider);
  }

  onUserUpdated(user:any) {
    console.log("Header : onUserUpdated() ",user);
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Header : onAuthStateChange() : loggedIn",loggedIn);
    /*
    if(loggedIn) {
      this.user = this.appConfigSvc.getUser();
      this.userService.getFollowers(this.user.id).subscribe(
              resp => {
                //console.log("HEADER COMPONENT : GETTING FRIENDS : in callback : resp is ",resp.text());
                this.my_friends = JSON.parse(resp.text());
              });
    }
    this.isLoggedIn = loggedIn;
    */
  }

  getFontStyle() {
    var data = this.appConfigSvc.accent_styles.font_color;
    return data;
  }

  getUsername() {
    if(this.user) {
      return this.user.first_name + " " + this.user.last_name.charAt(0).toUpperCase() + ".";
    } else {
      return "";
    }
  }


}
