/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ViewContainerRef, Injector } from '@angular/core';
import { Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  RouterState,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Event } from '@angular/router';
import { AppState } from './app.service';
import { AuthenticationService } from './common/services/authentication.service';
import { AppConfigService } from './common/services/app-config.service';



/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  templateUrl: './app.html',
})
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Protition';
  url = 'https://protition.com';

  private appConfigSvc: any;
  private authSvc: any;
  private isLoggedIn: boolean = false;
  private showHeader: boolean = false;
  private isPublicPage: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public appState: AppState,
    private injector: Injector) {

    this.authSvc = injector.get(AuthenticationService);
    this.appConfigSvc = injector.get(AppConfigService);

    this.isLoggedIn = this.authSvc.isAuthenticated();

    this.appConfigSvc.authStateChange.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
      },
          err => { console.error("authStateChange",err)}
      );

    router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        //console.log("App : NavigationStart");
        //console.log(event);
      }
      if(event instanceof NavigationEnd) {
        this.showHeader = !this.getIsPublic(this.route.snapshot);
      }
    });
  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  getIsPublic = (snapshot) => {
    if(!!snapshot && !!snapshot.children && !!(snapshot.children.length > 0)){
      return this.getIsPublic(snapshot.children[0]);
    }
    else if(!!snapshot.data && !!snapshot.data['is_public']){
      return snapshot.data['is_public'];
    }
    else{
      return '';
    }
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
