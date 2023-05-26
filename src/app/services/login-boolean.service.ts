import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginBooleanService {

  constructor() { }

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setValue(data: boolean) {
    this.loginStatus.next(data);
  }

  getValue() {
    return this.loginStatus.asObservable();
  }

  

}
