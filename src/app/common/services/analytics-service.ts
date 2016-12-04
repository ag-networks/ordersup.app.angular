import { Component, Injectable, EventEmitter } from '@angular/core';
import { Angulartics2Mixpanel } from 'angulartics2/src/providers/angulartics2-mixpanel';
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics';
import { Angulartics2 } from 'angulartics2';

@Component({
  providers: [
    Angulartics2Mixpanel
  ]
})

@Injectable()
export class AnalyticsService {

  constructor(
  ) {
    //private analytics1: Angulartics2,
    //private google:Angulartics2GoogleAnalytics,
    //private mixpanel:Angulartics2Mixpanel) {
    console.log("Analytics Service : Constructor");
  }

  setUser(user:any) {
    console.log("Analytics Service : setUser()",user);
    ////this.mixpanel.setUsername(user.id);
    ////this.mixpanel.setUserProperties(user);
    ////this.google.setUsername(user.id);
    ////this.google.setUserProperties(user);
  }

  trackLogInEvent(platform:string) {
    console.log("Analytics Service : sendSocialLogInEvent()",platform);
    ////this.mixpanel.eventTrack('Social Log In', { platform: platform });
    ////this.google.eventTrack('Social Log In', { platform: platform });
  }

  trackLogOutEvent(platform:string) {
    console.log("Analytics Service : trackLogOutEvent()",platform);
    //this.mixpanel.eventTrack('Log Out',{});
    //this.google.eventTrack('Log Out',{});
  }

  trackFollowUserEvent(user_id:string) {
    console.log("Analytics Service : trackFollowUserEvent()",user_id);
    //this.mixpanel.eventTrack('Follow User', { user_id: user_id });
    //this.google.eventTrack('Follow User', { user_id: user_id });
  }

  trackUnfollowUserEvent(user_id:string) {
    console.log("Analytics Service : trackUnfollowUserEvent()",user_id);
    //this.mixpanel.eventTrack('Un-Follow User', { user_id: user_id });
    //this.google.eventTrack('Un-Follow User', { user_id: user_id });
  }

  trackPostLikeEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostLikeEvent()",post_id);
    //this.mixpanel.eventTrack('Like Post', { post_id: post_id });
    //this.google.eventTrack('Like Post', { post_id: post_id });
  }

  trackPostUnLikeEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostUnLikeEvent()",post_id);
    //this.mixpanel.eventTrack('Un-Like Post', { post_id: post_id });
    //this.google.eventTrack('Un-Like Post', { post_id: post_id });
  }

  trackPostPrefEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostPrefEvent()",post_id);
    //this.mixpanel.eventTrack('Pref Post', { post_id: post_id });
    //this.google.eventTrack('Pref Post', { post_id: post_id });
  }

  trackPostUnPrefEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostUnPrefEvent()",post_id);
    //this.mixpanel.eventTrack('Un-Pref Post', { post_id: post_id });
    //this.google.eventTrack('Un-Pref Post', { post_id: post_id });
  }

  trackPostCommentEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostCommentEvent()",post_id);
    //this.mixpanel.eventTrack('Added Comment', { post_id: post_id });
    //this.google.eventTrack('Added Comment', { post_id: post_id });
  }

  trackPostRemoveCommentEvent(post_id:string,url:string) {
    console.log("Analytics Service : trackPostRemoveCommentEvent()",post_id);
    //this.mixpanel.eventTrack('Removed Comment', { post_id: post_id });
    //this.google.eventTrack('Removed Comment', { post_id: post_id });
  }

  trackFollowRequestApprovalEvent(user_id:string,url:string) {
    console.log("Analytics Service : trackFollowRequestApprovalEvent()",user_id);
    //this.mixpanel.eventTrack('Approved Follow Request', { user_id: user_id });
    //this.google.eventTrack('Approved Follow Request', { user_id: user_id });
  }

  trackFollowRequestDenialEvent(user_id:string,url:string) {
    console.log("Analytics Service : trackFollowRequestDenialEvent()",user_id);
    //this.mixpanel.eventTrack('Denied Follow Request', { user_id: user_id });
    //this.google.eventTrack('Denied Follow Request', { user_id: user_id });
  }

  trackUpdatedProfileImageEvent(image_url:string) {
    console.log("Analytics Service : trackUpdatedProfileImageEvent()");
    //this.mixpanel.setUserProperties({image_url:image_url});
    //this.mixpanel.eventTrack('Updated Profile Image', {});
    //this.google.setUserProperties({image_url:image_url});
    //this.google.eventTrack('Updated Profile Image', {});
  }

  trackUpdatedUsernameEvent(username:string) {
    console.log("Analytics Service : trackUpdatedUsernameEvent()");
    //this.mixpanel.setUserProperties({username:username});
    //this.mixpanel.eventTrack('Updated Username', {});
    //this.google.setUserProperties({username:username});
    //this.google.eventTrack('Updated Username', {});
  }

  trackUpdatedLocationEvent(location:string) {
    console.log("Analytics Service : trackUpdatedLocationEvent()");
    //this.mixpanel.setUserProperties({location:location});
    //this.mixpanel.eventTrack('Updated Location', {});
    //this.google.setUserProperties({location:location});
    //this.google.eventTrack('Updated Location', {});
  }

  trackUpdatedAboutMeEvent(about_me:string) {
    console.log("Analytics Service : trackUpdatedAboutMeEvent()");
    //this.mixpanel.setUserProperties({about_me:about_me});
    //this.mixpanel.eventTrack('Updated About Me', {});
    //this.google.setUserProperties({about_me:about_me});
    //this.google.eventTrack('Updated About Me', {});
  }

  trackUpdatedProfileStatusEvent(status:string) {
    console.log("Analytics Service : trackUpdatedProfileStatusEvent() : status => ",status);
    //this.mixpanel.setUserProperties({profile_status:status});
    //this.mixpanel.eventTrack('Changed Profile Status', {status:status});
    //this.google.setUserProperties({profile_status:status});
    //this.google.eventTrack('Changed Profile Status', {status:status});
  }

  trackUpdatedCategoriesEvent(cats:string) {
    console.log("Analytics Service : trackUpdatedCategoriesEvent() : status => ",status);
    //this.mixpanel.setUserProperties({categories_watched:cats});
    //this.mixpanel.eventTrack('Updated categories', {categories:cats});
    //this.google.setUserProperties({categories_watched:cats});
    //this.google.eventTrack('Updated categories', {categories:cats});
  }

  trackUpdatedPrivateCategoriesEvent(cats:string) {
    console.log("Analytics Service : trackUpdatedPrivateCategoriesEvent() : status => ",status);
    //this.mixpanel.setUserProperties({private_categories:cats});
    //this.mixpanel.eventTrack('Updated private categories', {categories:cats});
    //this.google.setUserProperties({private_categories:cats});
    //this.google.eventTrack('Updated private categories', {categories:cats});
  }

  trackDeletedPostEvent(post_id:string) {
    console.log("Analytics Service : trackDeletedPostEvent() : post_id => ",post_id);
    //this.mixpanel.eventTrack('Deleted Post', {post_id:post_id});
    //this.google.eventTrack('Deleted Post', {post_id:post_id});
  }

  trackSalesbarVisibilityChangedEvent(visible:boolean) {
    console.log("Analytics Service : trackSalesbarVisibilityChangedEvent() : visible => ",visible);

    if( visible === true) {
      //this.mixpanel.eventTrack('Salesbar Made Visible', {});
      //this.google.eventTrack('Salesbar Made Visible', {});
    } else {
      //this.mixpanel.eventTrack('Salesbar Made Invisible', {});
      //this.google.eventTrack('Salesbar Made Invisible', {});
    }
  }

  trackRepostingEnabledChangedEvent(enabled:boolean,user_id:number) {
    console.log("Analytics Service : trackRepostingEnabledChangedEvent() : user " + user_id + " enabled => ",enabled);
    if( enabled === true) {
      //this.mixpanel.eventTrack('Re-Preffing Enabled', {user_id:user_id});
      //this.google.eventTrack('Re-Preffing Enabled', {user_id:user_id});
    } else {
      //this.mixpanel.eventTrack('Re-Preffing Disabled', {user_id:user_id});
      //this.google.eventTrack('Re-Preffing Disabled', {});
    }
  }


}
