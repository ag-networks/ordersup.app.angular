import { Component, ViewChild, ElementRef, Injector } from '@angular/core';
import { AppConfigService } from '../common/services/app-config.service';
import { AnalyticsService } from '../common/services/analytics-service';
import { AccountPageService } from './account-page.service';
import {
  Router,
  NavigationStart,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'account',
  providers: [
  ],
  styleUrls: [ './account.scss' ],
  template : require('./account.html')
})
export class AccountComponent {

  private appConfigSvc: any;
  private analyticsSvc: any;
  private accountPageSvc: any;
  private userService: any;

  private categories = [];
  private user:any;
  private selectedCategory:any = null;

  images: Array<string> = ['sports', 'abstract', 'people', 'transport', 'city', 'technics', 'nightlife', 'animals'];


  userProfile = null;
  followers = [];
  following = [];
  tags = '';
  friendStatus = '';
  isFriend = false;
  isMe = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private injector: Injector
    //private userProfileService: UserProfileService,
  ) {


    this.appConfigSvc = injector.get(AppConfigService);
    this.accountPageSvc = injector.get(AccountPageService);
    this.user = this.appConfigSvc.getUser();
    this.accountPageSvc.setUser(this.user);
    console.log("Account : Constructor : user",this.user);
  }


  ngOnInit() {
    this.accountPageSvc.setUser(this.user);
/*
    this.sub = this.route.params.subscribe(params => {
    //this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
      console.log("User Profile params",params);
      let id = +params['id']; // (+) converts string 'id' to a number
      console.log("user id is",id);
      this.sub2 = this.userService.getUser(id).subscribe(
        resp => {
          this.userProfile = JSON.parse(resp.text());
          this.userProfileService.setUser(this.userProfile);
          this.categories = this.userProfile.category_collections;
          console.warn("categories =>",this.categories);

          if(this.userProfile.id == this.user.id) { this.isMe = true; }
          if(this.userProfile.categories_watching != null) {
            this.tags = this.userProfile.categories_watching;
          }
          this.userService.getFollowers(this.user.id).subscribe(
            resp => {
              //console.log(resp.text());
              this.followers = JSON.parse(resp.text());
            });

          this.userService.getFollowing(this.user.id).subscribe(
            resp => {
              //console.log(resp.text());
              this.following = JSON.parse(resp.text());
              for(var x=0;x<this.following.length;x++) {
                //console.log("FOLLOWING",this.following[x]);
                if(this.following[x].id == id) {
                  this.isFriend = true;
                }
              }
            });


        });
    });
*/
  }

  ngOnDestroy() {
  }

  // TODO: Remove this when we're done
  get currUserDiagnostic() { return JSON.stringify(this.user); }
  get diagnostic() { return JSON.stringify(this.userProfile); }

  getFontStyle() {
    var data = this.appConfigSvc.accent_styles.font_color;
    return data;
  }
}
