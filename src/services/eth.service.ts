import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ETHService {

  constructor(private http: HttpClient) { }

  ETHPrice !: number;

  getETHPrice():Observable<any>{

    const url = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR";
    return this.http.get<any>(url);

  };

  setETHPrice(value :number):void{
    this.ETHPrice = value;
  }



}
