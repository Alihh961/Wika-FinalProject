import { Injectable } from '@angular/core';
import { loggedInUserInfo } from '../Interface/userdetails';
import { BehaviorSubject, Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  private loggedInUserInfo:BehaviorSubject<loggedInUserInfo | null> =new BehaviorSubject<loggedInUserInfo | null>( null);

  public loggedInUserInfo$ : Observable<loggedInUserInfo | null > =this.loggedInUserInfo.asObservable();


  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedin$: Observable<boolean> = this.isLoggedIn.asObservable();

  // addLoggedInUserInfo(data :loggedInUser):void{
  //   this.loggedInUser = data;
  //   this.isLoggedIn = true;
  // }

  setLoggedInUserInfo(data :loggedInUserInfo):void{
    this.loggedInUserInfo.next(data);
  }

  setLoggedStatus(value :boolean):void{
    this.isLoggedIn.next(value);
  }

}
