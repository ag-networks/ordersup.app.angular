import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private authSvc: AuthenticationService,
    private router: Router
  ) {
    console.log("Login Guard : constructor");
  }

  canActivate() {
    console.log("Login Guard : canActivate()");

    return this.checkIfLoggedIn();
  }

  private checkIfLoggedIn(): boolean{

    // A call to the actual login service would go here
    // For now we'll just randomly return true or false

    let loggedIn:boolean = this.authSvc.isAuthenticated();

    if(!loggedIn){
      console.log("LoginGuard: The user is not logged in and can't navigate product details");
      this.router.navigate(['/login']);
    } else {

    }

    console.log("Login Guard : logged in ",loggedIn);

    return loggedIn;
  }
}
