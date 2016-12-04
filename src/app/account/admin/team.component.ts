import { Component, Input, EventEmitter, Injector } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { AppConfigService } from '../../common/services/app-config.service';
import { AccountPageService } from '../account-page.service';


@Component({
  selector: 'team',
  providers: [],
  template: require('./team.html'),
  styleUrls: [ './team.scss' ]
})
export class TeamComponent {

  private appConfig: any;
  private accountPageSvc: any;
  private user:any;
  sub: Subscription;

  @Input() id: any;

  users = [
    {
      name : "Tim Smith",
      title : "Regional Manger",
      email : "tim.smith@acmecorp.com",
      locations : "6"
    },
    {
      name : "Sara Lawson",
      title : "Assistant Manager - Austin",
      email : "s.lawson@acmecorp.com",
      locations : "1"
    },
    {
      name : "Nichole Williams",
      title : "Eash Coast PR Director",
      email : "n.williams@acmecorp.com",
      locations : "1"
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector) {
    console.log("Organization Form : Constructor");
    this.appConfig = injector.get(AppConfigService);
    this.accountPageSvc = injector.get(AccountPageService);
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
