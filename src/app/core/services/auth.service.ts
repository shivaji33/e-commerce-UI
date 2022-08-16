import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }


  setUserDetails(user: any) {
    if (!user) {
      return;
    }
    console.log(user);
    localStorage.setItem('userDetails',JSON.stringify(user))
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
  }
}
