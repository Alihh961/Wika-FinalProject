import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http :HttpClient) {  }

  login(credentials :any):Observable<any>{

    const url = `${baseURL}login.php?email=${credentials.logemail}&password=${credentials.logpassword}`;

    return this.http.post(url,credentials);
  }
}
