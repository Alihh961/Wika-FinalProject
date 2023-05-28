import { Injectable } from '@angular/core';
import { loggedInUserInfo } from '../Interface/userdetails';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  private loggedInUserInfo: BehaviorSubject<loggedInUserInfo> = new BehaviorSubject<loggedInUserInfo>(  {firstname: '',
  lastname: '',
  email: '',
  password: '',
  birthdate: new Date(),
  street: '',
  buildingnumber: '',
  gender: ''
});

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setLoggedInUserInfo(data: loggedInUserInfo): void {
    this.loggedInUserInfo.next(data);
  }

  getLoggedInUserInfo(): Observable<loggedInUserInfo> {
    return this.loggedInUserInfo.asObservable();
  }

  setLoggedInStatus(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

}
