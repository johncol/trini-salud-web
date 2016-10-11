import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { CreateCustomerNoteComponent } from './create-customer/create-customer-note/create-customer-note.component';
import { CustomerCreatedComponent } from './customer-created/customer-created.component';
import { CreateCustomerForm } from './create-customer/create-customer-form/create-customer-form.component';

import { CreateCustomerFormService } from './create-customer/create-customer-form/create-customer-form.service';
import { CustomerCreatedGuard } from './customer-created/customer-created.guard';
import { CustomerCreatedService } from './customer-created/customer-created.service';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    CreateCustomerNoteComponent,
    CustomerCreatedComponent,
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
      CreateCustomerFormService,
      CustomerCreatedService,
      CustomerCreatedGuard
  ],
  exports: [
    CreateCustomerComponent,
    CustomerCreatedComponent
  ]
})
export class CustomerModule { }
