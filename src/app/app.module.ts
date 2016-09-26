import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { CertificateModule } from './certificate/certificate.module';

import { routing } from './app.routing';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    SharedModule,
    LoginModule,
    CustomerModule,
    CertificateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
