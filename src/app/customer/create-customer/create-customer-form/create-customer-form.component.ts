import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { CreateCustomerFormService } from './create-customer-form.service';
import { RoutingService } from './../../../shared/routing/routing.service';
import { CustomerCreatedService } from './../../customer-created/customer-created.service';

@Component({
    selector: 'ts-create-customer-form',
    templateUrl: 'create-customer-form.component.html'
})
export class CreateCustomerForm implements OnInit {
    form: FormGroup;
    state: any;

    constructor(
        private formService: CreateCustomerFormService,
        private routingService: RoutingService,
        private elementRef: ElementRef,
        private customerCreatedService: CustomerCreatedService

    ) { }

    ngOnInit(): void {
        this.form = this.formService.initFormControls();
        this.state = this.formService.initFormState();
    }

    onSubmit(): void {
        this.formService.processSubmit()
            .subscribe(
                success => {
                    this.customerCreatedService.save(
                        this.formService.value('identification'),
                        this.formService.value('password')
                    );
                    this.routingService.toCustomerCreated();
                },
                error => this.formService.displayError(error)
            );
    }

    focus(field: string, event: any): void {
        event.preventDefault();
        this.elementRef.nativeElement.querySelector('#' + field).focus();
    }
}
