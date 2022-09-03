import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ObserverSubjectService } from './observer-subject.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,  private observerSubjectService: ObserverSubjectService) { }


  setUserDetails(user: any) {
    if (!user) {
      return;
    }
    localStorage.setItem('userDetails',JSON.stringify(user));
  }


  getUserDetails() {
    const user = JSON.parse(`${localStorage.getItem('userDetails')}`) || {};
    return user;
  }

  get isLoggedIn() {
    const keys  = Object.keys(this.getUserDetails()) || [];
    if (keys.length) {
      return true;
    }
    return false;
  }


  logout() {
    localStorage.clear();
    this.observerSubjectService.setUserLogChangeSubject('LOGOUT');
    this.router.navigate(['/home']);
  }
}
