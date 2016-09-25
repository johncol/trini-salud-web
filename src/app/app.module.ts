import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { CustomerModule } from './customer/customer.module';
import { CertificateModule } from './certificate/certificate.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    LoginModule,
    CustomerModule,
    CertificateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
