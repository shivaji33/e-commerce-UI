import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';
import { loginURL } from 'src/app/utils/urls';
import { HttpService } from '../core/services/http.service';
import { AuthService } from '../core/services/auth.service';
import { ObserverSubjectService } from '../core/services/observer-subject.service';
import { ToastrService } from 'ngx-toastr';

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
    private observerSubjectService: ObserverSubjectService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const url = environment.baseUrl + loginURL;
    this.httpService.postData(url, this.loginCreds).subscribe((res: any) => {
      this.toastr.success(res.message)
      this.authService.setUserDetails(res.userData);
      this.observerSubjectService.setUserLogChangeSubject('LOGIN');
      this.bsModalRef.hide();
    });
  }

}
