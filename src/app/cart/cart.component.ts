import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/services/auth.service';
import { ObserverSubjectService } from '../core/services/observer-subject.service';
import { UsersApiService } from '../core/services/users-api.service';
import { numberWithCommas } from '../core/utils/amount-fn';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userCartDetails: any[] = [];
  date = new Date();
  placeOrderBtnIntervel: any;
  placeOrderBtn = 0;
  userId: any;
  constructor(
    private authService: AuthService,
    private usersApiService: UsersApiService,
    private toaster: ToastrService,
    private observerSubjectService: ObserverSubjectService
  ) {
    this.userId = this.authService.getUserDetails()?.id;
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    if (this.userId) {
      this.usersApiService
        .getUserCartDetais(this.userId)
        .subscribe((res: any) => {
          this.userCartDetails = res?.userCart?.cart || [];
        });
    }
  }

  offerPercent(item: any) {
    return Math.floor(
      ((item.prevPrice - item.currentPrice) / item.prevPrice) * 100
    );
  }

  placeOrderMouseup() {
    if (this.placeOrderBtn == 100) {
      this.placeOrder();
    } else {
      this.placeOrderBtnIntervel = setInterval(() => {
        if (this.placeOrderBtn != 0) {
          this.placeOrderBtn--;
        }
      }, 1);
    }
  }
  placeOrderMousedown() {
    clearInterval(this.placeOrderBtn);
  }

  placeOrder() {
    console.log('Order Placed');
  }

  incrementCartItem(cart: any) {
    this.usersApiService
      .cartItemQtnChange(this.userId, cart.id, 'incrementCartItem')
      .subscribe((res) => {
        this.getUserDetails();
      });
  }

  decrementCartItem(cart: any) {
    this.usersApiService
      .cartItemQtnChange(this.userId, cart.id, 'decrementCartItem')
      .subscribe((res) => {
        this.getUserDetails();
      });
  }

  cartItemQtnChange(
    cart: any,
    type: 'incrementCartItem' | 'decrementCartItem'
  ) {
    if (type === 'incrementCartItem') {
      this.incrementCartItem(cart);
    } else {
      this.decrementCartItem(cart);
    }
  }

  removeCartItem(cart: any) {
    this.usersApiService
      .removeCartItem(this.userId, cart.id)
      .subscribe((res: any) => {
        this.toaster.success(res.message);
        this.observerSubjectService.setUserLogChangeSubject('LOGIN');
        this.getUserDetails();
      });
  }

  itemsTotalPrice() {
    return numberWithCommas(this.userCartDetails.reduce((previousValue, {currentPrice, quantity}) => {
      return previousValue + (currentPrice * quantity)
  }, 0));
  }
}
