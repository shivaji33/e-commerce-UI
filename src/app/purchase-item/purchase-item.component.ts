import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { ObserverSubjectService } from '../core/services/observer-subject.service';
import { UsersApiService } from '../core/services/users-api.service';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss'],
})
export class PurchaseItemComponent implements OnInit, OnChanges {
  @Input() purchaseItem: any = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private userApiService: UsersApiService,
    private observerSubjectService: ObserverSubjectService
  ) {}


  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}

  ratingColor(ratingStr: string) {
    const rating = Number(ratingStr);

    if (rating >= 4 && rating <= 5) {
      return { background: 'green' };
    } else if (rating >= 2.5 && rating <= 3.9) {
      return { background: '#ffc72c' };
    } else if (rating < 2.5) {
      return { background: 'red' };
    }
    return null;
  }

  offerPercent(item: any) {
    return Math.floor(
      ((item.prevPrice - item.currentPrice) / item.prevPrice) * 100
    );
  }

  addToBag() {
    if (this.authService.isLoggedIn) {
      if (this.purchaseItem.isExistInCart) {
        this.router.navigate(['/view-cart']);
      } else {
        this.updateUserCart();
      }
    }
  }

  updateUserCart() {
    const pi = {...this.purchaseItem};
    delete pi.isExistInCart;
    const body = {
      ...pi,
      userId: this.authService.getUserDetails().id,
      itemId: pi.id
    };
    this.userApiService.addToCart(body).subscribe((res) => {
      this.observerSubjectService.setUserLogChangeSubject('LOGIN');
      this.router.navigate(['/viewcart']);
    });
  }

}
