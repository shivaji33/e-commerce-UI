import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { loginURL } from 'src/app/utils/urls';
import { HttpService } from '../core/services/http.service';
import { AuthService } from '../core/services/auth.service';
import { ObserverSubjectService } from '../core/services/observer-subject.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginCreds: any = {};
  constructor(
    public bsModalRef: BsModalRef,
    private httpService: HttpService,
    private authService: AuthService,
    private observerSubjectService: ObserverSubjectService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const url = environment.baseUrl + loginURL;
    this.httpService.postData(url, this.loginCreds).subscribe((res: any) => {
      this.authService.setUserDetails(res);
      this.observerSubjectService.setUserLogChangeSubject('LOGIN');
      this.bsModalRef.hide();
    });
  }

}
