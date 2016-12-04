import { Component, Input, EventEmitter, Injector } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AppConfigService } from '../../common/services/app-config.service';
import { MarketingPagesPageService } from '../marketing-pages-page.service';


@Component({
  selector: 'how-it-works',
  providers: [],
  template: require('./how-it-works.html'),
  styleUrls: [ './how-it-works.scss' ]
})
export class HowItWorksComponent {

  private appConfig: any;
  private marketingPagesPageSvc: any;
  //private user:any;
  //sub: Subscription;
  //@Input() id: any;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector) {
    console.log("How It Works : Constructor");
    this.appConfig = injector.get(AppConfigService);
    this.marketingPagesPageSvc = injector.get(MarketingPagesPageService);
  }

  ngOnInit() {
    /*
    this.user = this.userProfileService.getUser();
    if(!this.user) {
      this.sub = this.userProfileService.userSetAnounced$.subscribe(
        user => {
          console.log("Organization Form : got user");
          this.user = user;
        });
    }
    */
  }

  ngAfterViewInit() {
    //console.log("Organization Form : ngAfterViewInit()");
  }
}
