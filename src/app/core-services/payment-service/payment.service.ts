import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  postPaymentData(endpoint:string,payload){
    return this.httpClient.post(endpoint,payload);
  }
}
