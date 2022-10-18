import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartData: any = {};
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((res: any) => {
      this.cartData = JSON.parse(atob(res.cartData));
      console.log(this.cartData);
    });
   }

  ngOnInit(): void {
  }

}
