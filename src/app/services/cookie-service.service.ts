import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CookieServiceService {

  constructor(private cookieService : CookieService) { }

  setValue(name: string,value :string):void{
    this.cookieService.set(name , value);
  }

  getValue(name:string):string{
    return this.cookieService.get(name);
  }

  getAllValues():{ [key: string]: string }{
    return this.cookieService.getAll();
  }
  
}
