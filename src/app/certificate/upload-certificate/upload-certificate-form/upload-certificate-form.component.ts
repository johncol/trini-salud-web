import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { UploadCertificateFormService } from './upload-certificate-form.service';
import { RoutingService } from './../../../shared/routing/routing.service';

declare let $: any;

@Component({
    selector: 'ts-upload-certificate-form',
    templateUrl: 'upload-certificate-form.component.html'
})
export class UploadCertificateFormComponent {
    @Output() onMakingRequest: EventEmitter<boolean> = new EventEmitter<boolean>();
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
        this.onMakingRequest.emit(true);
        this.formService.processSubmit(this.elementRef)
            .subscribe(
                success => this.routingService.toSuccessProcess(),
                error => this.handleErrorResult(error)
            );
    }

    fileChanged(event: any): void {
        this.formService.triggerFileValidation();
    }

    focus(field: string, event: any): void {
        event.preventDefault();
        this.elementRef.nativeElement.querySelector('#' + field).focus();
    }

    private handleErrorResult(error: any): void {
        this.onMakingRequest.emit(false);
        this.formService.displayError(error);
    }

}
