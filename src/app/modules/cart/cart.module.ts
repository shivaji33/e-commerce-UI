import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartPriceDetailsComponent } from './cart-price-details/cart-price-details.component';
import { CheckOutStepsComponent } from './check-out-steps/check-out-steps.component';


@NgModule({
  declarations: [CartComponent, PaymentComponent, CheckoutComponent, CartItemComponent, CartPriceDetailsComponent, CheckOutStepsComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
