import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from 'src/environment/environment';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { loginDataType } from '../Interface/userdetails';//creating an interface to handle logemail and logpassword



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http :HttpClient ) {  }

  login(credentials :loginDataType ):Observable<any>{

    // const url = `${baseURL}login.php?email=${credentials.logemail}&password=${credentials.logpassword}`;

    return this.http.post<any>(`${baseURL}login.php`,credentials);
}

}

