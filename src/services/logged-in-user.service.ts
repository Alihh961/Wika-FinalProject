import { Injectable } from '@angular/core';
import { loggedInUserInfo } from '../app/Interface/userdetails';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  private loggedInUserInfo: BehaviorSubject<loggedInUserInfo> = new BehaviorSubject<loggedInUserInfo>(  {

  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: new Date(),
  gender: '',

});

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setLoggedInUserInfo(data: loggedInUserInfo): boolean {
    this.loggedInUserInfo.next(data);
    return true;
  }

  getLoggedInUserInfo(): Observable<loggedInUserInfo> {
    return this.loggedInUserInfo.asObservable();
  }

  setLoggedInStatus(value: boolean): boolean { //! I return a boolean because i have to check if the method is okay when a user user logni
    this.isLoggedIn.next(value);
    return true;
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }


}
