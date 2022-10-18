import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DeletePromptComponent } from './delete-prompt/delete-prompt.component';




@NgModule({
  declarations: [
    LoginComponent,
    DeletePromptComponent
  ],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [ModalModule,BsDropdownModule, FormsModule, DeletePromptComponent]
})
export class SharedModule { }
