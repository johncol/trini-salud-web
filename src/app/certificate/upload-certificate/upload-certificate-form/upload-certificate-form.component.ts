import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

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
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.form = this.formService.initFormControls(this.elementRef);
        this.state = this.formService.initFormState();
        this.formService.initCustomerOptions()
            .subscribe(options => this.customerOptions = options);
    }

    onSubmit(): void {
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

}
