import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environment/environment';
import { loginDataType } from '../app/Interface/userdetails';//creating an interface to handle logemail and logpassword



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http :HttpClient ) {  }

  login(credentials :loginDataType ):Observable<any>{
    return this.http.post<any>(`${baseURL}login.php`,credentials);
}

  getDataOfUser(token:string):Observable<any>{
    return this.http.get<any>(`${baseURL}loggedInUserData.php?token=${token}`);
  }

}
