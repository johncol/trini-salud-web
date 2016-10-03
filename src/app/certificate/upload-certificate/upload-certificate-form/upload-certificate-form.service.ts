import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/filter';

import { CertificateData } from './../../../backend/certificate/upload-certificate/certificate-data'
import { PatientData } from './../../../backend/certificate/upload-certificate/patient-data'
import { UploadCertificateRequest } from './../../../backend/certificate/upload-certificate/upload-certificate.request';
import { UploadCertificateResponse } from './../../../backend/certificate/upload-certificate/upload-certificate.response';
import { CertificateService } from './../../../backend/certificate/certificate.service';

@Injectable()
export class UploadCertificateFormService {
    form: FormGroup;
    state: any;

    constructor(
        private formBuilder: FormBuilder,
        private certificateService: CertificateService
    ) { }

    initFormControls(): FormGroup {
        this.form = this.formBuilder.group({
            identification: ['', Validators.required],
            name: ['', Validators.required],
            birthdate: ['', Validators.required],
            gender: ['', Validators.required],
            eps: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            customer: ['', Validators.required],
            certificateName: ['', Validators.required],
            // certificateFile: ['', Validators.required]
        });
        return this.form;
    }

    initFormState(): any {
        this.state = {
            error: false,
            highlightErrors: false,
            displayMessage: false,
            message: null
        };
        return this.state;
    }

    processSubmit(): Observable<string> {
        console.log('this.form.value: ', this.form.value);
        return Observable.create(subscriber => {
            if (this.form.valid) {
                this.handleFormSubmit().subscribe(
                    response => this.handleSubmitResponse(subscriber, response),
                    error => subscriber.error('Error en el servidor')
                );
            } else {
                this.handleFormSubmitWithErrors(subscriber);
            }
        });
    }

    displayError(message: string): void {
        this.state.error = true;
        this.state.displayMessage = true;
        this.state.message = message;
    }

    private handleFormSubmit(): Observable<UploadCertificateResponse> {
        this.state.error = false;
        this.state.highlightErrors = false;
        this.state.displayMessage = false;
        this.state.message = null;
        console.log('this.mapToDataRequest(): ', this.mapToDataRequest());
        return this.certificateService.upload(this.mapToDataRequest());
    }

    private handleFormSubmitWithErrors(subscriber: Subscriber<any>): void {
        this.state.highlightErrors = true;
        subscriber.error('Hay errores en el formulario');
    }

    private handleSubmitResponse(subscriber: Subscriber<any>, response: UploadCertificateResponse): void {
        if (!response.success) {
            subscriber.error(response.message);
        }
        subscriber.next('Ok');
    }

    private mapToDataRequest(): UploadCertificateRequest {
        return new UploadCertificateRequest(
            new PatientData(
                this.fieldValue('identification'),
                this.fieldValue('name'),
                this.fieldValue('birthdate'),
                this.fieldValue('gender'),
                this.fieldValue('eps'),
                this.fieldValue('address'),
                this.fieldValue('email'),
                this.fieldValue('phone')
            ),
            new CertificateData(
                this.fieldValue('certificateName'),
                null
                // new Blob([this.fieldValue('certificateName')])
            ),
            this.fieldValue('customer')
        );
    }

    private fieldValue(field: string): any {
        return this.form.controls[field].value;
    }
}
