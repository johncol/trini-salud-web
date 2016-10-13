import { Injectable, ElementRef } from '@angular/core';
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
import { CustomerService } from './../../../backend/customer/customer.service';
import { FileValidators } from './../../../shared/custom-form-validations/file-validators';

declare let $: any;

@Injectable()
export class UploadCertificateFormService {
    form: FormGroup;
    state: any;

    constructor(
        private formBuilder: FormBuilder,
        private certificateService: CertificateService,
        private customerService: CustomerService
    ) { }

    initFormControls(elementRef: ElementRef): FormGroup {
        let fileValidators: FileValidators = new FileValidators(elementRef, 'certificateFile');
        this.form = this.formBuilder.group({
            patientAlreadyRegistered: [false],
            identification: ['', Validators.required],
            name: ['', Validators.required],
            gender: ['', Validators.required],
            customer: ['', Validators.required],
            certificateName: ['', Validators.required],
            certificateFile: ['', fileValidators.required.bind(fileValidators)]
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

    initCustomerOptions(): Observable<any[]> {
        return Observable.create(subscriber => {
            let customerOptions: any[] = [];
            this.customerService.list().subscribe(response => {
                if (response.success) {
                    response.data.forEach(customer =>
                        customerOptions.push({ id: customer.identification, label: `${customer.identification} - ${customer.name}` })
                    );
                }
            });
            subscriber.next(customerOptions);
        });
    }

    processSubmit(elementRef: ElementRef): Observable<string> {
        return Observable.create(subscriber => {
            if (this.isValid()) {
                this.handleFormSubmit(elementRef).subscribe(
                    response => this.handleSubmitResponse(subscriber, response),
                    error => subscriber.error('Error en el servidor')
                );
            } else {
                this.handleFormSubmitWithErrors(subscriber);
            }
        });
    }

    triggerFileValidation(): void {
        this.form.controls['certificateFile'].updateValueAndValidity();
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
        let validCertificateFile: boolean = this.validField('certificateFile');
        return validId && validCertificateName && validCertificateFile;
    }

    private handleFormSubmit(elementRef: ElementRef): Observable<BackendResponse<UploadCertificateResponse>> {
        this.state.error = false;
        this.state.highlightErrors = false;
        this.state.displayMessage = false;
        this.state.message = null;
        return Observable.create(subscriber => {
            this.mapToDataRequest(elementRef).subscribe(requestData => {
                this.certificateService.upload(requestData)
                    .subscribe(response => subscriber.next(response));
            })
        });
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

    private mapToDataRequest(elementRef: ElementRef): Observable<UploadCertificateRequest> {
        return  Observable.create(subscriber => {
            this.readFile(elementRef).subscribe(file => {
                subscriber.next(this.buildUploadCertificateRequest(file));
            });
        });
    }

    private readFile(elementRef: ElementRef): Observable<string> {
        return Observable.create(subscriber => {
            let file: Blob = $(elementRef.nativeElement).find('#certificateFile')[0].files[0];
            let reader = new FileReader();
            reader.onload = function (event: any) {
                let file64: string = event.target.result;
                subscriber.next(file64.substr(file64.indexOf(',') + 1));
            };
            reader.readAsDataURL(file);
        });
    }

    private buildUploadCertificateRequest(file: string): UploadCertificateRequest {
        let certificate: CertificateData = new CertificateData(
            this.fieldValue('certificateName'),
            file
        );
        let patient: PatientData = this.fieldValue('patientAlreadyRegistered') ?
            new PatientData(this.fieldValue('identification')) :
            this.buildFullPatientData();
        return new UploadCertificateRequest(patient, certificate, this.fieldValue('customer'));
    }

    private buildFullPatientData(): PatientData {
        return new PatientData(
            this.fieldValue('identification'),
            this.fieldValue('name'),
            this.fieldValue('gender')
        );
    }

    private fieldValue(field: string): any {
        return this.form.controls[field].value;
    }

    private validField(field: string): any {
        return this.form.controls[field].valid;
    }
}
