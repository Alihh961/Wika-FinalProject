import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoggedInUserService } from './logged-in-user.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private loggedInUserServiceInstance: LoggedInUserService, private router: Router) { }

  canActivate(): boolean {
    var isLoggedIn = false ;
    this.loggedInUserServiceInstance.getLoggedInStatus().subscribe(value =>{
      isLoggedIn = value;
    });
    if (isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
