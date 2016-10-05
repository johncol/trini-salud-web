import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/filter';

import { BackendResponse } from './../../../backend/shared/backend.response';
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
            patientAlreadyRegistered: [false],
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
        return Observable.create(subscriber => {
            if (this.isValid()) {
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

    private isValid(): boolean {
        let unregisteredPatient: boolean = !this.fieldValue('patientAlreadyRegistered');
        if (unregisteredPatient) {
            return this.form.valid;
        }
        let validId: boolean = this.validField('identification');
        let validCertificateName: boolean = this.validField('certificateName');
        // let validCertificateFile: boolean = this.validField('certificateFile');
        // return validId && validCertificateName && validCertificateFile;
        return validId && validCertificateName;
    }

    private handleFormSubmit(): Observable<BackendResponse<UploadCertificateResponse>> {
        this.state.error = false;
        this.state.highlightErrors = false;
        this.state.displayMessage = false;
        this.state.message = null;
        let requestData: UploadCertificateRequest = this.mapToDataRequest();
        return this.certificateService.upload(requestData);
    }

    private handleFormSubmitWithErrors(subscriber: Subscriber<any>): void {
        this.state.highlightErrors = true;
        subscriber.error('Hay errores en el formulario');
    }

    private handleSubmitResponse(subscriber: Subscriber<any>, response: BackendResponse<UploadCertificateResponse>): void {
        if (!response.success) {
            subscriber.error(response.message);
        }
        subscriber.next('Ok');
    }

    private mapToDataRequest(): UploadCertificateRequest {
        let patientAlreadyRegistered: boolean = this.fieldValue('patientAlreadyRegistered');
        let certificate: CertificateData = new CertificateData(
            this.fieldValue('certificateName'),
            null // new Blob([this.fieldValue('certificateName')])
        );
        if (patientAlreadyRegistered) {
            let patient: PatientData = new PatientData(this.fieldValue('identification'));
            return new UploadCertificateRequest(patient, certificate);
        } else {
            let patient: PatientData = new PatientData(
                this.fieldValue('identification'),
                this.fieldValue('name'),
                this.fieldValue('birthdate'),
                this.fieldValue('gender'),
                this.fieldValue('eps'),
                this.fieldValue('address'),
                this.fieldValue('email'),
                this.fieldValue('phone')
            );
            return new UploadCertificateRequest(patient, certificate, this.fieldValue('customer'));
        }
    }

    private fieldValue(field: string): any {
        return this.form.controls[field].value;
    }

    private validField(field: string): any {
        return this.form.controls[field].valid;
    }
}
