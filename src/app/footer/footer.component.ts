import { Component, ViewChild, Injector } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthenticationService } from '../common/services/authentication.service';
import { AppConfigService } from '../common/services/app-config.service';

@Component({
  selector: 'footer',
  styleUrls: [ './footer.scss' ],
  //template: require('./header.html')
  templateUrl: './footer.html'
})
export class Footer {

  private appConfigSvc:any;
  private authSvc:any;
  private isLoggedIn:boolean = false;
  private isAdmin:boolean = false;
  private user:any = {};

  constructor(//private userService: UserService,
              private router:Router,
              private injector:Injector) {
    console.log("Footer : Constructor");

    this.appConfigSvc = injector.get(AppConfigService);
    this.authSvc = injector.get(AuthenticationService);

    this.isLoggedIn = this.authSvc.isAuthenticated();

    this.appConfigSvc.userUpdated.subscribe(
      user => this.onUserUpdated(user),
      err => {
        console.error("isAuthenticatedError", err)
      });

    this.appConfigSvc.authStateChange.subscribe(
      loggedIn => this.onAuthStateChange(loggedIn),
      err => {
        console.error("authStateChange", err)
      });


    if (this.isLoggedIn) {
      this.user = this.appConfigSvc.getUser();
      this.isAdmin = this.user.is_admin;
    }

  }


  onUserUpdated(user:any) {
    console.log("Footer : onUserUpdated() ", user);
  }

  onAuthStateChange(loggedIn:boolean) {
    console.log("Footer : onAuthStateChange() : loggedIn", loggedIn);
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

}
