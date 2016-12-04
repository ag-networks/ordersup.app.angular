import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { ReactiveFormsModule } from "@angular/forms";

/*
 * Platform and Environment providers/directives/pipes
 */

import { ENV_PROVIDERS } from './environment';
//import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Home } from './home/home.component';
import { Profile } from './profile/profile.component';
import { About } from './about/about.component';
import { Login } from './login/login.component';

import { NoContent } from './no-content/no-content';
import { XLarge } from './home/x-large';
import { NG2_UI_AUTH_PROVIDERS } from 'ng2-ui-auth';

import { Header } from './header/header.component';
import { Footer } from './footer/footer.component';
import { AppConfigService,BD_API_BASE_URL,FACEBOOK_CLIENT_ID,INSTAGRAM_CLIENT_ID,GOOGLE_CLIENT_ID } from './common/services/app-config.service';
import { AuthenticationService } from './common/services/authentication.service';
import { AnalyticsService } from './common/services/analytics-service';
import { Angulartics2Mixpanel } from 'angulartics2/src/providers/angulartics2-mixpanel';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { Angulartics2 } from 'angulartics2';
import { AccountComponent } from './account/account.component';
import { MarketingPagesComponent } from './marketing-pages/marketing-pages.component';
import { OrganizationFormComponent } from './account/admin/organization-form.component';
import { AdminUserFormComponent } from './account/admin/admin-user-form.component';
import { TeamComponent } from './account/admin/team.component';
import { HowItWorksComponent } from './marketing-pages/how-it-works/how-it-works.component';

import { MenuDetailsComponent } from './menu/menu-details.component';
import { ConceptComponent } from './concept/concept.component';
import { ConceptDetails } from './concept/concept-details';
import { ConceptOwnerDetails } from './concept/concept-owner-details';
import { ConceptLocationDetails } from './concept/concept-location-details';

import { ConceptOwnerForm } from './concept/concept-owner-form';
import { ConceptLocationForm } from './concept/concept-location-form';
import { ConceptLocationUserForm } from './concept/concept-location-user-form';



// providers / services
import { LoginGuard } from './common/route-guards/login-guard';
import { AccountPageService } from './account/account-page.service';
import { MarketingPagesPageService } from './marketing-pages/marketing-pages-page.service';
import { UserService } from './common/services/user.service';
import { MenuService } from './common/services/menu.service';
import { ConceptService } from './common/services/concept.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};
const AUTH_PROVIDERS = NG2_UI_AUTH_PROVIDERS(
  {defaultHeaders: DEFAULT_POST_HEADER,
    baseUrl: BD_API_BASE_URL,
    providers: {
      facebook: {
        clientId: FACEBOOK_CLIENT_ID,
        scope: ['email','public_profile']
      },
      instagram: {clientId: INSTAGRAM_CLIENT_ID},
      google: {clientId: GOOGLE_CLIENT_ID}
    }});

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AppConfigService,
  AuthenticationService,
  AnalyticsService,
  Angulartics2Mixpanel,
  Angulartics2Mixpanel,
  Angulartics2GoogleAnalytics,
  Angulartics2,
  //Auth, //Provides the Auth downstream
  //JwtHttp, //Provides the Auth downstream
  AUTH_PROVIDERS,
  AccountPageService,
  MarketingPagesPageService,
  UserService,
  MenuService,
  ConceptService,
  LoginGuard
  //NG2_UI_AUTH_PROVIDERS({defaultHeaders: DEFAULT_POST_HEADER, providers: {google: {clientId: GOOGLE_CLIENT_ID}}})
  //Config, //Provides the Config downstream

];

type StoreType = {
  state: InteralStateType,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    Login,
    About,
    Home,
    Profile,
    NoContent,
    XLarge,
    Header,
    Footer,
    AccountComponent,
    MarketingPagesComponent,
    OrganizationFormComponent,
    TeamComponent,
    HowItWorksComponent,
    MenuDetailsComponent,
    ConceptComponent,
    ConceptDetails,
    ConceptOwnerDetails,
    ConceptLocationDetails,
    AdminUserFormComponent,
    ConceptOwnerForm,
    ConceptLocationForm,
    ConceptLocationUserForm
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }
  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
