import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { SearchCertificateComponent } from './search-certificate/search-certificate.component';
import { SearchCertificateFormComponent } from './search-certificate/search-certificate-form/search-certificate-form.component';
import { SearchCertificateNoteComponent } from './search-certificate/search-certificate-note/search-certificate-note.component';

@NgModule({
  declarations: [
    SearchCertificateComponent,
    SearchCertificateFormComponent,
    SearchCertificateNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [],
  exports: [
    SearchCertificateComponent
  ]
})
export class CertificateModule { }
