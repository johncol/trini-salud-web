import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { AuthenticationService } from './authentication/authentication.service';
import { CustomerService } from './customer/customer.service';
import { CertificateService } from './certificate/certificate.service';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule
  ],
  providers: [
    AuthenticationService,
    CustomerService,
    CertificateService
  ],
  exports: []
})
export class BackendModule { }
