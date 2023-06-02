import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { LoggedInUserService } from './logged-in-user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private loggedInUserServiceInstance: LoggedInUserService, private router: Router) { }

  isLoggedIn: boolean = false;
  ngOnInit() {
    this.loggedInUserServiceInstance.getLoggedInStatus().subscribe(value => {
      this.isLoggedIn = value;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn === true) {
      this.router.navigate(["home"]);
      return true;
    } else {
      return false;
    }
  }

}
