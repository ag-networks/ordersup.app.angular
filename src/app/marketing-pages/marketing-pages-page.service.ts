import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MarketingPagesPageService {
  private user: any;
  private following:Array<any>;
  private followers:Array<any>;
  private pendingFollowers:Array<any>;

  private userSetSource = new Subject<any>();
  userSetAnounced$ = this.userSetSource.asObservable();

  private followersSetSource = new Subject<any>();
  followersSetAnounced$ = this.followersSetSource.asObservable();

  private followingSetSource = new Subject<any>();
  followingSetAnounced$ = this.followingSetSource.asObservable();

  private pendingFollowersSetSource = new Subject<any>();
  pendingFollowersSetAnounced$ = this.pendingFollowersSetSource.asObservable();

  constructor(){
    console.log("Account Page : Constructor");
  }

  setUser(user){
    console.log("Account Page : setUser()",user);
    this.user = user;
    this.userSetSource.next(this.user);
  }

  getUser()
  {
    console.log("Account Page : getUser()",this.user);
    return this.user;
  }

  setFollowers(followers){
    console.log("Account Page : setFollowers()",followers);
    this.followers = followers;
    this.followersSetSource.next(this.followers);
  }

  getFollowers()
  {
    console.log("Account Page : getFollowers()",this.followers);
    return this.followers;
  }

  setFollowing(following){
    console.log("Account Page : setFollowing()",following);
    this.following = following;
    this.followingSetSource.next(this.following);
  }

  getFollowing()
  {
    console.log("Account Page : getFollowing()",this.following);
    return this.following;
  }

  setPendingFollowers(pendingFollowers){
    console.log("Account Page : setPendingFollowers()",pendingFollowers);
    this.pendingFollowers = pendingFollowers;
    this.pendingFollowersSetSource.next(this.pendingFollowers);
  }

  getPendingFollowers()
  {
    console.log("Account Page : getPendingFollowers()",this.pendingFollowers);
    return this.pendingFollowers;
  }


}
