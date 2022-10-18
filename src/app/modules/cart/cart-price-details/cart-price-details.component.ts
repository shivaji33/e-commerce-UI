import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-price-details',
  templateUrl: './cart-price-details.component.html',
  styleUrls: ['./cart-price-details.component.scss']
})
export class CartPriceDetailsComponent implements OnInit {
  @Input() itemsTotalPrice: any;
  @Input() itemsLength: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
