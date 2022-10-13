import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { RoundedItemComponent } from './rounded-item/rounded-item.component';

import { PurchaseItemComponent } from './purchase-item/purchase-item.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";
import { InterceptorService } from './core/services/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    RoundedItemComponent,
    PurchaseItemComponent,
    CartComponent,
    PaymentComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule.forRoot({type: 'ball-elastic-dots'}),
    ToastrModule.forRoot({closeButton: true, timeOut: 3000})
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
