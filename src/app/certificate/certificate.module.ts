import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './../shared/shared.module';

import { SearchCertificateComponent } from './search-certificate/search-certificate.component';
import { SearchCertificateFormComponent } from './search-certificate/search-certificate-form/search-certificate-form.component';
import { SearchCertificateNoteComponent } from './search-certificate/search-certificate-note/search-certificate-note.component';

import { CertificateResultComponent } from './certificate-result/certificate-result.component';
import { CertificateListComponent } from './certificate-result/certificate-list/certificate-list.component';
import { PatientInformationComponent } from './certificate-result/patient-information/patient-information.component';

import { UploadCertificateComponent } from './upload-certificate/upload-certificate.component';
import { UploadCertificateFormComponent } from './upload-certificate/upload-certificate-form/upload-certificate-form.component';
import { UploadCertificateNoteComponent } from './upload-certificate/upload-certificate-note/upload-certificate-note.component';

import { CertificateResultService } from './certificate-result/certificate-result.service';
import { CertificateResultGuard } from './certificate-result/certificate-result.guard';
import { UploadCertificateFormService } from './upload-certificate/upload-certificate-form/upload-certificate-form.service';

@NgModule({
  declarations: [
    SearchCertificateComponent,
    SearchCertificateFormComponent,
    SearchCertificateNoteComponent,
    CertificateResultComponent,
    CertificateListComponent,
    PatientInformationComponent,
    UploadCertificateComponent,
    UploadCertificateFormComponent,
    UploadCertificateNoteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    UploadCertificateFormService,
    CertificateResultService,
    CertificateResultGuard
  ],
  exports: [
    SearchCertificateComponent,
    CertificateResultComponent,
    UploadCertificateComponent
  ]
})
export class CertificateModule { }
