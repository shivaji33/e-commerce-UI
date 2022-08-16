import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit, OnChanges {
  @Input() purchaseItem: any = {};

  constructor(private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
  }

  ratingColor(ratingStr: string) {
    const rating = Number(ratingStr);

    if (rating >= 4 && rating <= 5) {
      return {'background': 'green'};
    } else if (rating >= 2.5 && rating <= 3.9) {
      return {'background': '#ffc72c'};
    } else if (rating < 2.5) {
      return {'background': 'red'};
    }
    return null;
  }

  offerPercent(item: any) {
    return Math.floor(((item.prevPrice - item.currentPrice) / item.prevPrice) * 100);
  }

  addToBag() {

    this.router.navigate(['/viewcart']);
  }

  updateUserCart() {
    
  }
}
