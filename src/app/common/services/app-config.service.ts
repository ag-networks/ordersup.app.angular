import { Injectable, EventEmitter, Injector } from '@angular/core';
//import { LocalStorage, SessionStorage } from 'angular2-localstorage/WebStorage';
//import { SettingsService } from './common/settings.service';
//import { SalesbarService } from './sales-bar/salesbar-service';
import { AuthenticationService } from './authentication.service';
import { NG2_UI_AUTH_PROVIDERS, JwtHttp } from 'ng2-ui-auth';

export var BD_API_BASE_URL:string = "https://vm.2owls.com:7778";
//export var BD_API_BASE_URL:string = "https://api.ordersup.com";
export var FACEBOOK_CLIENT_ID:string = "135454413535701";
export var INSTAGRAM_CLIENT_ID:string = "2521b53201a7406885439fd10590383c";
export var GOOGLE_CLIENT_ID:string = "1035256706072-5chdhcn8uqvq05mur42t0hr2v6ssbjtc.apps.googleusercontent.com";

@Injectable()
export class AppConfigService {

  public api_base_url = BD_API_BASE_URL;

  //@LocalStorage() public user:any = {};
  private  user:any = {};
  private loggedIn: boolean = false;
  public userUpdated: EventEmitter<any>;
  public authStateChange: EventEmitter<any>;
  public salesbarUpdated: EventEmitter<any>;
  public headerVisibilityChanged: EventEmitter<boolean>;
  public showHeader: boolean = false;
  public searchTags:Array<string> = [];
  public settings: any;

  private localStoragePrefix = 'bd_';

  // styles
  public accent_styles = {
    font_color : { color : this.user.accent_color }
  }

  constructor(
    private injector: Injector
  ) {
    console.log("App Config : Constructor");
    //this.authSvc = injector.get(AuthenticationService);
    //this.salesbarSvc = injector.get(SalesbarService);
    //this.settingsSvc = injector.get(SettingsService);
    this.userUpdated = new EventEmitter();
    this.authStateChange = new EventEmitter();
    this.headerVisibilityChanged = new EventEmitter<boolean>();
    this.salesbarUpdated = new EventEmitter();

    this.user = this.getFromLocalStorage('user');
  }

  updateUser(obj:any) {
    console.log("App Config : updating user",obj);
    if(this.user == null) {
      this.user = obj;
      this.saveToLocalStorage('user',obj);
      this.setStyles(this.user.accent_color);
    } else {
      for (var attrname in obj) {
        this.user[attrname] = obj[attrname];
      }
      this.setStyles(this.user.accent_color);
      console.log("App Config : new color",this.user.accent_color);
      this.saveToLocalStorage('user',this.user);
      this.userUpdated.emit(this.user);
    }
  }

  updateSalesbar(content:string) {
    this.salesbarUpdated.emit(content);
  }

  updateAuthState(loggedIn:boolean) {
    console.log("App Config : auth state changed to " + String(loggedIn) + " .. EMITTING EVENT");
    this.loggedIn = loggedIn;
    this.authStateChange.emit(this.loggedIn);
    if(!this.loggedIn) {
      this.user = {};
    }
  }

  updateSettings(settings:any) {
    console.log("App Config : updateSettings()",settings);
    this.settings = settings;
  }

  getUser() {
    if(this.user == null)
      this.user = this.getFromLocalStorage('user');
    return this.user;
  }

  setStyles(accent_color:string) {
    this.accent_styles = {
      font_color : { color : this.user.accent_color }
    }
  }

  setHeaderIsVisible(is_visible:boolean) {
    console.log("App Config : setHeaderVisibility()",is_visible);
    this.showHeader = is_visible;
    this.headerVisibilityChanged.emit(is_visible);
  }

  saveToLocalStorage(name:string,obj:any) {
    console.log("App Config : saveToLocalStorage() : ",name,obj);

    localStorage.setItem(this.localStoragePrefix+name, JSON.stringify(obj));
  }

  getFromLocalStorage(name:string) {
    console.log("App Config : getFromLocalStorage() : ",name);
    return JSON.parse(localStorage.getItem(this.localStoragePrefix+name));
  }




}
