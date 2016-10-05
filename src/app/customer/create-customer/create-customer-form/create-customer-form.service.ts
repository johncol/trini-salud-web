import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/add/operator/filter';

import { BackendResponse } from './../../../backend/shared/backend.response';
import { CustomerService } from './../../../backend/customer/customer.service';
import { CreateCustomerRequest } from './../../../backend/customer/create-customer.request';
import { CreateCustomerResponse } from './../../../backend/customer/create-customer.response';

@Injectable()
export class CreateCustomerFormService {
    form: FormGroup;
    state: any;

    constructor(
        private formBuilder: FormBuilder,
        private customerService: CustomerService
    ) { }

    initFormControls(): FormGroup {
        this.form = this.formBuilder.group({
            identification: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', Validators.required]
        });
        return this.form;
    }

    initFormState(): any {
        this.state = {
            showPassword: false,
            error: false,
            highlightErrors: false,
            displayMessage: false,
            message: null
        };
        return this.state;
    }

    processSubmit(): Observable<string> {
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

    private handleFormSubmit(): Observable<BackendResponse<CreateCustomerResponse>> {
        this.state.error = false;
        this.state.highlightErrors = false;
        this.state.displayMessage = false;
        this.state.message = null;
        return this.customerService.save(this.form.value);
    }

    private handleFormSubmitWithErrors(subscriber: Subscriber<any>): void {
        this.state.highlightErrors = true;
        subscriber.error('Hay errores en el formulario');
    }

    private handleSubmitResponse(subscriber: Subscriber<any>, response: BackendResponse<CreateCustomerResponse>): void {
        if (!response.success) {
            subscriber.error(response.message);
        }
        subscriber.next('Ok');
    }

}