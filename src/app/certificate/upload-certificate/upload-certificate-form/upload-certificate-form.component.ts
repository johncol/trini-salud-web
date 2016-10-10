import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Http } from '@angular/http';

import { UploadCertificateFormService } from './upload-certificate-form.service';
import { RoutingService } from './../../../shared/routing/routing.service';

declare let $: any;

@Component({
    selector: 'ts-upload-certificate-form',
    templateUrl: 'upload-certificate-form.component.html'
})
export class UploadCertificateFormComponent {
    form: FormGroup;
    state: any;
    customerOptions: any[];

    constructor(
        private formService: UploadCertificateFormService,
        private routingService: RoutingService,
        private elementRef: ElementRef,
        private http: Http
    ) {
        console.log('http: ', http);
    }

    ngOnInit(): void {
        this.form = this.formService.initFormControls(this.elementRef);
        this.state = this.formService.initFormState();
        this.formService.initCustomerOptions()
            .subscribe(options => this.customerOptions = options);
    }

    onSubmit(): void {
        // this.executeSampleFileUploadRequest();
        this.formService.processSubmit(this.elementRef)
            .subscribe(
                success => this.routingService.toSuccessProcess(),
                error => this.formService.displayError(error)
            );
    }

    fileChanged(event: any): void {
        this.formService.triggerFileValidation();
    }

    focus(field: string, event: any): void {
        event.preventDefault();
        this.elementRef.nativeElement.querySelector('#' + field).focus();
    }

    executeSampleFileUploadRequest(): void {
        let element = $(this.elementRef.nativeElement).find('#certificateFile')[0];
        console.log('element: ', element);
        let file: Blob = element.files[0];
        console.log('file: ', file);
        let reader = new FileReader();
        reader.onload = (event: any) => {
            console.log('reader on load event: ', event);
            console.log('result: ', event.target.result);
            let formData: FormData = new FormData();
            formData.append('data', file, 'example-file.jpg');
            // this.http.post('http://localhost:8080/certificate/sample', formData)
            this.http.post('http://localhost:8080/certificate/sample', { data: event.target.result })
                .subscribe(response => console.info('SAMPLE RESPONSE: ', response));

        };
        reader.readAsDataURL(file);
    }

}
