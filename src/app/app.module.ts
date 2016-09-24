import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginFooterComponent } from './login/login-footer/login-footer.component';

import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { CreateCustomerNoteComponent } from './customer/create-customer/create-customer-note/create-customer-note.component';
import { CreateCustomerForm } from './customer/create-customer/create-customer-form/create-customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoginFormComponent,
    LoginFooterComponent,
    CreateCustomerComponent,
    CreateCustomerForm,
    CreateCustomerNoteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
