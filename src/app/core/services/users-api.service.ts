import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  constructor(
    private httpService: HttpService
  ) {}

  getUserDetails(userId: any) {
      const url = environment.baseUrl + `users/${userId}`;
      return this.httpService.getData(url);
  }

  getUserCartDetais(userId: any) {
    const url = environment.baseUrl + `users/${userId}/getCartDetails`;
    return this.httpService.getData(url);
  }

  cartItemQtnChange(userId: any, itemId: any, cartItemChange: any) {

    const url = environment.baseUrl + `users/${userId}/${itemId}/${cartItemChange}`;
    return this.httpService.getData(url);

  }
}
