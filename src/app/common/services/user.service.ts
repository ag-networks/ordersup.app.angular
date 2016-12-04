import { Injectable, Injector } from '@angular/core';
import { JwtHttp } from 'ng2-ui-auth';
import { AppConfigService } from './app-config.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  appConfig: any;
  private user:any;

  constructor(
    private jwtHttp: JwtHttp,
    private injector: Injector) {
    //console.log("UserService : Constructor");
    this.appConfig = injector.get(AppConfigService);
    this.user = this.appConfig.getUser();
  }

  getUser(id:number) {
    //console.log("UserService : getUser()");
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/users/' + String(id));
  }

  updateCategories(categories:string) {
    //console.log("User Service : updateCategories()",categories);
    var data = {
      user : { categories_watching : categories}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updatePrivateCategories(categories:string) {
    //console.log("User Service : updatePrivateCategories()",categories);
    var data = {
      user : { private_categories : categories}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateUsername(username:string) {
    //console.log("User Service : updateUsername()",username);
    var data = {
      user : { username : username}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateRepostEnabled(repostEnabled:boolean) {
    //console.log("User Service : updateRepostEnabled()",repostEnabled);
    var data = {
      user : { repost_enabled : repostEnabled}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateAboutMe(about_me:string) {
    //console.log("User Service : updateAboutMe()",about_me);
    var data = {
      user : { about_me : about_me}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateLocation(location:string) {
    //console.log("User Service : updateLocation()",location);
    var data = {
      user : { location : location}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateAccentColor(color:string) {
    //console.log("User Service : updateAccentColor()",color);
    var data = {
      user : { accent_color : color}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateProfileImage(image_url:string) {
    //console.log("User Service : updateProfileImage()",image_url);
    var data = {
      user : { image_url : image_url}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  updateProfileStatus(status:string) {
    //console.log("User Service : updateProfileStatus()",status);
    var data = {
      user : { profile_status : status}
    };
    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/users/'+this.user.id, JSON.stringify(data));
  }

  getFollowers(id: number) {
    //console.log("User Service : getFollowers()",id);
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/users/'+id+'/followers');
  }

  getFollowing(id: number) {
    //console.log("User Service : getFollowing()",id);
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/users/'+id+'/following');
  }

  getPendingFollowers(id: number) {
    //console.log("User Service : getPendingFollowers()",id);
    return this.jwtHttp.get(this.appConfig.api_base_url + '/v1/users/'+id+'/pending_followers');
  }

  followUser(id: number) {
    //console.log("User Service : followUser()",id);
    var data = {
      relationship : { friend_id : id}
    };
    return this.jwtHttp.post(this.appConfig.api_base_url + '/v1/relationships', JSON.stringify(data));
  }

  unfollowUser(id: number) {
    //console.log("User Service : unfollowUser()",id);
    var data = {
      relationship : { friend_id : id}
    };

    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/relationships/unfollow', JSON.stringify(data));
  }

  denyUser(id: number) {
    //console.log("User Service : denyUser()",id);
    var data = {
      relationship : { friend_id : id}
    };

    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/relationships/deny', JSON.stringify(data));
  }

  approveUser(id: number) {
    //console.log("User Service : approveUser()",id);
    var data = {
      relationship : { friend_id : id}
    };

    return this.jwtHttp.put(this.appConfig.api_base_url + '/v1/relationships/approve', JSON.stringify(data));
  }
}
