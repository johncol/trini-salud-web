import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';

import { LoginService } from './login-form/login.service';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    LoginFooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [
    LoginService
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
