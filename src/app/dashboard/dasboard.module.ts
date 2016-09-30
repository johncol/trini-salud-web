import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [
      DashboardComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  exports: [
      DashboardComponent
  ]
})
export class DashboardModule { }
