import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { ObserverSubjectService } from 'src/app/core/services/observer-subject.service';
import { UsersApiService } from 'src/app/core/services/users-api.service';
import { DeletePromptComponent } from 'src/app/shared/delete-prompt/delete-prompt.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() userCartDetails: any[] = [];
  userId: any;
  @Output() cartItemChange = new EventEmitter();
  date = new Date();
  bsModalRef?: BsModalRef;
  constructor(
    private usersApiService: UsersApiService,
    private authService: AuthService,
    private toaster: ToastrService,
    private observerSubjectService: ObserverSubjectService,
    private modalService: BsModalService
  ) {
    this.userId = this.authService.getUserDetails()?.id;
  }

  ngOnInit(): void {
  }

  offerPercent(item: any) {
    return Math.floor(
      ((item.prevPrice - item.currentPrice) / item.prevPrice) * 100
    );
  }

  incrementCartItem(cart: any) {
    this.usersApiService
      .cartItemQtnChange(this.userId, cart.itemId, 'incrementCartItem')
      .subscribe((res) => {
        this.cartItemChange.emit();
      });
  }

  decrementCartItem(cart: any) {
    this.usersApiService
      .cartItemQtnChange(this.userId, cart.itemId, 'decrementCartItem')
      .subscribe((res) => {
        this.cartItemChange.emit();
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
    const initialState: any = {
      initialState: {
        data: {
          title: 'Remove Item',
          bodyTitle: 'Are you sure you want to remove this item?',
          itemId: cart.itemId
        },
      }
    };
    this.bsModalRef = this.modalService.show(
      DeletePromptComponent,
      initialState
    );
    this.getModalEvent();
  }

  getModalEvent() {
    this.bsModalRef?.content?.promptEvent.subscribe((itemId: any) => {
      if (itemId) {
        this.usersApiService
        .removeCartItem(this.userId, itemId)
        .subscribe((res: any) => {
          this.toaster.success(res.message);
          this.observerSubjectService.setUserLogChangeSubject('LOGIN');
          this.cartItemChange.emit();
          this.bsModalRef?.hide();
        });
      }
    });
  }
}
