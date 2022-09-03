import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { UsersApiService } from '../core/services/users-api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userCartDetails: any[] =  [];
  date = new Date();
  placeOrderBtnIntervel: any;
  placeOrderBtn = 0;
  userId: any;
  constructor(private authService: AuthService, private usersApiService: UsersApiService) {
    this.userId = this.authService.getUserDetails()?.id;
   }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.userId) {
      this.usersApiService.getUserCartDetais(this.userId).subscribe((res: any) => {
        this.userCartDetails = res?.userCart?.cart || [];
      });
    }
  }

  offerPercent(item: any) {
    return Math.floor(((item.prevPrice - item.currentPrice) / item.prevPrice) * 100);
  }

  placeOrderMouseup(){
    if (this.placeOrderBtn == 100) {
      this.placeOrder()
    } else {
      this.placeOrderBtnIntervel = setInterval(() => {
        if (this.placeOrderBtn != 0) {
          this.placeOrderBtn--;
        }
      }, 1)
    }
  }
  placeOrderMousedown(){
    clearInterval(this.placeOrderBtn);
  }

  placeOrder() {
    console.log('Order Placed')
  }

  incrementCartItem(cart: any) {
    this.usersApiService.cartItemQtnChange(this.userId, cart.id, 'incrementCartItem').subscribe(res => {
      this.getUserDetails();
    });
  }

  decrementCartItem(cart: any) {
    this.usersApiService.cartItemQtnChange(this.userId, cart.id, 'decrementCartItem').subscribe(res => {
      this.getUserDetails();
    });
  }

  cartItemQtnChange(cart: any, type: 'incrementCartItem' | 'decrementCartItem') {
    if (type === 'incrementCartItem') {
      this.incrementCartItem(cart)
    } else {
      this.decrementCartItem(cart);
    }
  }
}
