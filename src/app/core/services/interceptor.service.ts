import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getUserDetails();
    if (authToken) {
      const auth = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken.token)
      });
       return next.handle(auth);
    }
    return next.handle(req);
  }
}
