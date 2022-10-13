import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { UsersApiService } from '../core/services/users-api.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  santhItems = [
    {
      name: 'Vegetables',
      imgUrl: 'https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg',
    },
    {
      name: 'Fish',
      imgUrl: 'https://image.shutterstock.com/shutterstock/photos/1410046670/display_1500/stock-photo-assortment-of-meat-and-seafood-beef-chicken-fish-and-pork-1410046670.jpg',
    },
    {
      name: 'Chicken',
      imgUrl: 'https://4.imimg.com/data4/TE/PT/MY-37123818/point-500x500.jpg',
    },
    {
      name: 'Mutton',
      imgUrl: 'https://www.licious.in/blog/wp-content/uploads/2022/03/Goat-Curry-cut.-2.png',
    },
    {
      name: 'Egg',
      imgUrl: 'https://www.heart.org/-/media/Images/News/2018/August-2018/0816Eggs_SC.jpg',
    }
  ];
  purchaseItems = [];
  subscription = new Subscription();
  constructor(private userApiService: UsersApiService, private authService: AuthService) {}


  ngOnInit(): void {
    this.getPurchaseItems();

  }

  getPurchaseItems() {
    this.userApiService.getPurchaseItems().subscribe((res: any) => {
        this.purchaseItems = res.vegetables;
        this.getUserDetails();
    });
  }

  getUserDetails() {
    if (this.authService.getUserDetails()?.id) {
      const sub = this.userApiService.getUserCartDetais(this.authService.getUserDetails().id)
      .subscribe((userData: any) => {
        const {cart} = userData.userCart || {};
        this.purchaseItems.forEach((item: any) => {
          if (cart?.length) {
            cart.forEach((cartItem: any) => {
              if (cartItem.itemId === item.id) {
                item.isExistInCart = true;
              }
            });
          }
        });
      });
      this.subscription.add(sub);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
