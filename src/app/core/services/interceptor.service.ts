import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private spinnerService: NgxSpinnerService, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    let auth = req;
    const authToken = this.authService.getUserDetails();
    if (authToken) {
      auth = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken.token)
      });
    }
    return next.handle(auth).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinnerService.hide();
      }
      return event;
    }), catchError((err: any) => {
      const {error} = err;
      this.spinnerService.hide();
      this.toastr.error(error.message)
      throw error;
    }));
  }
  }

