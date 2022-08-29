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
    if (!localStorage.getItem('userDetails')) {
        return null;
    }
    const user = JSON.parse(localStorage.getItem('userDetails') || '')
    if (!user) {
      return null
    }
    return user;
  }

  logout() {
    localStorage.clear();
    this.observerSubjectService.setUserLogChangeSubject('LOGOUT');
  }
}
