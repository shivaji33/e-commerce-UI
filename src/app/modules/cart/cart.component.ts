import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { ObserverSubjectService } from '../../core/services/observer-subject.service';
import { UsersApiService } from '../../core/services/users-api.service';
import { numberWithCommas } from '../../core/utils/amount-fn';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userCartDetails: any[] = [];
  placeOrderBtn = 0;
  userId: any;
  cartId: any;
  constructor(
    private authService: AuthService,
    private usersApiService: UsersApiService,
    private observerSubjectService: ObserverSubjectService,
    private router: Router
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
          this.cartId = res?.userCart.id;
        });
    }
  }


  placeOrder() {
    // this.usersApiService.createOrder({cartId: this.cartId}).subscribe((res: any) => {
    //   this.observerSubjectService.setUserLogChangeSubject('LOGIN');
      this.router.navigate(['/checkout', btoa(JSON.stringify({userCartDetails: this.userCartDetails, itemsTotalPrice: this.itemsTotalPrice()}))]);
    // });
  }

  itemsTotalPrice() {
    return numberWithCommas(this.userCartDetails.reduce((previousValue, {currentPrice, quantity}) => {
      return previousValue + (currentPrice * quantity)
  }, 0));
  }

  cartItemChange() {
    this.getUserDetails();
  }
}
