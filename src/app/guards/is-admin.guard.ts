import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedInUserService } from '../services/logged-in-user.service';


@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private loggedInUserServiceInstance: LoggedInUserService , private router :Router){}
  canActivate(): boolean {
    var isAdmin = false ;
    this.loggedInUserServiceInstance.getLoggedIsUserIsAdmin().subscribe(value =>{
      isAdmin = value;
    });
    if (isAdmin) {
      this.router.navigate(['/home']);

      return true;
    } else {


      return false;
    } 
  
}

}
