import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ObserverSubjectService } from '../core/services/observer-subject.service';
import { UsersApiService } from '../core/services/users-api.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {
  isToggled = false;
  bsModalRef?: BsModalRef;
  bagDetails: any = {};
  subscription = new Subscription();
  constructor(
    private modalService: BsModalService,
    public authService: AuthService,
    private observerSubjectService: ObserverSubjectService,
    private router: Router,
    private usersApiService: UsersApiService,
    private toastr: ToastrService
  ) {}


  ngOnInit(): void {
    this.getBagDetails();
    this.getLogChange();
  }

  onToggle() {
    this.isToggled = !this.isToggled;
  }

  openloginComponent() {
    const initialState: ModalOptions = {
      initialState: {},
      class: 'modal-dialog-centered',
    };
    this.bsModalRef = this.modalService.show(LoginComponent, initialState);
  }

  getBagDetails() {
    const userId = this.authService.getUserDetails()?.id;
    if (userId) {
      this.usersApiService.getUserCartDetais(userId).subscribe((res: any) => {
        this.bagDetails = res.userCart;
      });
    }
  }
  getLogChange() {
    const sub = this.observerSubjectService.getUserLogChangeSubject().subscribe((res: string) => {
      if (res === 'LOGIN') {
        this.getBagDetails();
      } else {
        this.bagDetails = {};
      }
    });
    this.subscription.add(sub);
  }

  routeToViewCart() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/viewcart']);
    } else {
      this.toastr.warning('Please login to see the bag')
      this.openloginComponent();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
