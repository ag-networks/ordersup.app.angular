import { Component, OnInit, OnDestroy, Input, ViewChild, Injector } from '@angular/core';
import { Router, ActivatedRoute }       from '@angular/router';
//import { Menu } from './menu';
//import { MenuCategory } from './menu-category';
//import { MenuItem } from './menu-item';
import { AppConfigService } from '../common/services/app-config.service';
import { UserService } from '../common/services/user.service';
import { MenuService } from '../common/services/menu.service';
import { AnalyticsService } from '../common/services/analytics-service';

//import { CapitalizePipe } from '../common/capitalize.pipe';
//import { CalendarPipe } from 'angular2-moment';
//import { DataTableModule,SharedModule } from 'primeng/primeng';

@Component({
  selector: 'menu-details',
  providers: [
  ],
  template: require('./menu-details.html'),
  styleUrls: [ './menu-details.scss' ],
})
export class MenuDetailsComponent {

  private appConfigSvc: any;
  private analyticsSvc: any;
  private menuSvc: any;
  private user:any;
  private myMenu: boolean = false;
  private sub: any;
  private isLoggedIn: boolean = false;
  @Input() menu: any;
  @Input() refresh: any;

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private injector: Injector) {
    this.appConfigSvc = injector.get(AppConfigService);
    this.menuSvc = injector.get(MenuService);
    this.analyticsSvc = injector.get(AnalyticsService);
    //this.isLoggedIn = this.authenticationService.isAuthenticated();
    this.user = this.appConfigSvc.getUser();
    console.log("Menu Details : Constructor : user => ",this.user);
  }

  ngOnInit() {
    console.log("Menu Details : ngOnInit() : this.user => ",this.user);
    console.log("Menu Details : ngOnInit() : this.menu => ",this.menu);

    //if(this.menu && this.menu != undefined && this.menu != null) {

    console.log(this.menu);

    if(this.menu != null && this.menu != undefined && this.menu != '' && this.menu != 'undefined') {
      this.getMenu(this.menu.id);
    } else {
      this.sub = this.route.params.subscribe(params => {
        if(params['menu_id']) {
          this.getMenu(params['menu_id']);
        }
      });
    }

  }

  ngOnDestroy() {
    if(this.sub)
      this.sub.unsubscribe();
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    console.log("diagnostic");
    return JSON.stringify(this.menu);
  }

  getMenu(id: string) {
    console.log("Menu Details : getMenu()",id);

    this.menuSvc.get(id).subscribe(resp => {
      console.log("Menu Details : getMenu() : resp => ",resp);
      this.menu = JSON.parse(resp.text());
      if(this.menu.user.id == this.user.id) {
        this.myMenu = true;
      }
    });
  }


  gotoHome() { this.router.navigate(['/home']); }




}
