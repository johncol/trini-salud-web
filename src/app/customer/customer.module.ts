import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateCustomerNoteComponent } from './create-customer/create-customer-note/create-customer-note.component';
import { CreateCustomerForm } from './create-customer/create-customer-form/create-customer-form.component';

import { CreateCustomerFormService } from './create-customer/create-customer-form/create-customer-form.service';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    CreateCustomerNoteComponent,
    CreateCustomerForm
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SharedModule
  ],
  providers: [
      CreateCustomerFormService
  ],
  exports: [
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
