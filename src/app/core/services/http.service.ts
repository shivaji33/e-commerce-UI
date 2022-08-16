import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }


  getData(url: string, options?: any) {
   return this.httpClient.get(url, options);
  }

  postData(url: string,body: any, options?: any) {
    return this.httpClient.post(url, body, options);
   }
}
