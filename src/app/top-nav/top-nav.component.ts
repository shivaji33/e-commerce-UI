import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
  isToggled = false;
  bsModalRef?: BsModalRef;
  subscription = new Subscription();
  userDetails: any = {};
  constructor(
    private modalService: BsModalService,
    public authService: AuthService
  ) {}


  ngOnInit(): void {
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
}
