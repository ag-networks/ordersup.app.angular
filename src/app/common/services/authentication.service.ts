import { Component, Injectable, Injector } from '@angular/core';
import { Config,Auth,JwtHttp } from 'ng2-ui-auth';
import { AppConfigService } from './app-config.service';

@Injectable()
//@Component({
//  //selector: 'auth',
//  providers: [
//    Config,
//    Auth,
//    JwtHttp
//  ]
//})
export class AuthenticationService {

  appConfigService: any;

  //user: any = null;

  constructor(
    //private appConfig: AppConfigService,
    //private userService: UserService,
    private config: Config,
    private auth: Auth,
    private jwtHttp: JwtHttp,
    private injector: Injector) {
    console.log("AuthenticationService : Constructor");
    this.appConfigService = injector.get(AppConfigService);
  }

  // authenticate(name: string, userData?: any): Observable<Response>;
  authenticate(provider: string) {
    //console.log("Authentication Service : Authenticate()");
    return this.auth.authenticate(provider);
  }

  login(user: any) {
    //console.log("Authentication Service : login()");
    return this.auth.login(user);
  }

  loginMerchant(user: any) {
    //console.log("Authentication Service : loginMerchant()");
    this.config.loginUrl = "/auth/merchant/login";
    return this.auth.login(user);
  }

  isAuthenticated() {
    var authed = this.auth.isAuthenticated();
    //console.log("Authentication Service : isAuthenticated()",authed);
    //if(authed && this.user == null) {
    //  this.getUser();
    //}
    return this.auth.isAuthenticated();
  }

  isAuthenticatedAlert() {
    if (this.auth.isAuthenticated() == true) {
      alert("Authenticated!");
    } else {
      alert("Not Authenticated");
    }
  }

  logout() {
    console.log("Authentication Service : logout()");
    this.auth.logout();
    this.appConfigService.updateAuthState(false);
    localStorage.removeItem("user");
    //this.user = null;
  }

  getToken() {
    alert(this.auth.getToken());
  }

  getDecodedToken() {
    let token = this.auth.getToken();

    if (token && token.split('.').length === 3) {
      try {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
      } catch (e) {
        return undefined;
      }
    }
  }
}
