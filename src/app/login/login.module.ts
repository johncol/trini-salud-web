import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { BackendModule } from './../backend/backend.module';

import { LogoutComponent } from './logout.component';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginFooterComponent } from './login-footer/login-footer.component';

import { LoginService } from './login-form/login.service';

@NgModule({
  declarations: [
    LogoutComponent,
    LoginComponent,
    LoginFormComponent,
    LoginFooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    BackendModule
  ],
  providers: [
    LoginService
  ],
  exports: [
    LogoutComponent,
    LoginComponent
  ]
})
export class LoginModule { }
