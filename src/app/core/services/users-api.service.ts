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

    const url = environment.baseUrl + `users/${userId}/cartItemChange/${itemId}/${cartItemChange}`;
    return this.httpService.getData(url);

  }

  removeCartItem(userId: any, itemId: any) {
    const url = environment.baseUrl + `users/${userId}/deleteCartItem/${itemId}`;
    return this.httpService.getData(url);
  }

  addToCart(body: any) {
    const url = environment.baseUrl + `users/addToCart`;
    return this.httpService.updateData(url, body);
  }

  getPurchaseItems() {
    const url = environment.baseUrl + 'vegetables/getVegetables';
    return this.httpService.getData(url);
  }
}
