import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { AccountComponent } from './account/account.component';
import { MarketingPagesComponent } from './marketing-pages/marketing-pages.component';
import { OrganizationFormComponent } from './account/admin/organization-form.component';
import { HowItWorksComponent } from './marketing-pages/how-it-works/how-it-works.component';
import { AdminUserFormComponent } from './account/admin/admin-user-form.component';
import { TeamComponent } from './account/admin/team.component';
import { Login } from './login/login.component';
import { Profile } from './profile/profile.component';
import { LoginGuard } from './common/route-guards/login-guard';

import { MenuDetailsComponent } from './menu/menu-details.component';
import { ConceptComponent } from './concept/concept.component';
import { ConceptDetails } from './concept/concept-details';
import { ConceptOwnerDetails } from './concept/concept-owner-details';
import { ConceptLocationDetails } from './concept/concept-location-details';

import { DataResolver } from './app.resolver';

/*
 { path: '',                    component: Home },
 { path: 'home',                component: Home },
 { path: 'admin',               component: Admin },
 { path: 'concept',             component: Concept },
 { path: 'concept/:id',         component: ConceptDetails },
 { path: 'concept/owner/:id',   component: ConceptOwnerDetails },
 { path: 'concept/owner/:owner_id/location/:id', component: ConceptLocationDetails },
 { path: 'concept/owner/:owner_id/menu/:menu_id', component: MenuDetailsComponent },
 { path: 'concept/owner/:owner_id/location/:location_id/menu/create', component: MenuEditor },
 { path: 'concept/owner/:owner_id/location/:location_id/menu/:menu_id', component: MenuDetailsComponent },
 { path: 'menu/edit/:id',       component: MenuEditor },
 { path: 'menu/:id',            component: MenuDetailsComponent },
 { path: 'user/:id',            component: UserProfileComponent },
 { path: 'user/edit/:id',       component: UserProfileEditComponent },
 { path: 'login',               component: RetailerLogin },
 */
export const ROUTES: Routes = [
  { path: '',      component: Login },
  { path: 'home',  component: Home },
  { path: 'login', component: Login },
  { path: 'profile', component: Profile, data: {is_public:true} },
  //{ path: 'admin',               component: Admin },
  { path: 'concepts',             component: ConceptComponent },
  { path: 'concept/:id',         component: ConceptDetails },
  //{ path: 'concept/owner/:owner_id/menu/:menu_id', component: MenuDetailsComponent },
  { path: 'concept/owner/:id',   component: ConceptOwnerDetails },
  { path: 'concept/owner/:owner_id/location/:id', component: ConceptLocationDetails },
  { path: 'concept/owner/:owner_id/menu/:menu_id', component: MenuDetailsComponent },
  //{ path: 'concept/owner/:owner_id/location/:location_id/menu/create', component: MenuEditor },
  { path: 'concept/owner/:owner_id/location/:location_id/menu/:menu_id', component: MenuDetailsComponent },
  //{ path: 'menu/edit/:id',       component: MenuEditor },
  { path: 'menu/:id',            component: MenuDetailsComponent },
  //{ path: 'user/:id',            component: UserProfileComponent },
  //{ path: 'user/edit/:id',       component: UserProfileEditComponent },
  {
    path: 'detail', loadChildren: () => System.import('./+detail')
  },
  { path: 'account',
    component: AccountComponent,
    canActivate:[LoginGuard],
    children: [
      { path: '', redirectTo: 'admin/company', pathMatch: 'full' },
      { path: 'admin/company', component: OrganizationFormComponent },
      { path: 'admin/team',         component: TeamComponent },
      { path: 'admin/profile',      component: AdminUserFormComponent }
    ]
  },
  { path: 'info',
    component: MarketingPagesComponent,
    //canActivate:[LoginGuard],
    children: [
      { path: '', redirectTo: 'how-it-works', pathMatch: 'full' },
      { path: 'how-it-works', component: HowItWorksComponent }
    ]
  },
  { path: '**',    component: NoContent },
];
