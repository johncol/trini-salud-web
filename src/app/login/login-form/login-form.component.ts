import { Component, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { LoginData } from './login-data';
import { LoginService } from './login.service';
import { LoginStatus } from './login-status.enum';

@Component({
    selector: 'ts-login-form',
    templateUrl: 'login-form.component.html'
})
export class LoginFormComponent implements OnInit {
    @Output() onMakingRequest: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onResult: EventEmitter<LoginStatus> = new EventEmitter<LoginStatus>();
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.onMakingRequest.emit(true);
            this.loginService.login(this.loginForm.value)
                .subscribe(
                    authenticated => this.handleLoginResponse(authenticated),
                    error => this.handleErrorResponse(error)
                );
        } else {
            this.handleFormErrors();
        }
    }

    focusPassword(event: any): void {
        event.preventDefault();
        this.focus('password');
    }

    private handleLoginResponse(authenticated: boolean): void {
        this.onMakingRequest.emit(false);
        this.loginForm.reset();
        if (authenticated) {
            this.onResult.emit(LoginStatus.AUTHENTICATED);
        } else {
            this.onResult.emit(LoginStatus.NOT_AUTHENTICATED);
            this.focus('username');
        }
    }

    private handleErrorResponse(error: any): void {
        console.error('Fatal authentication error: ', error);
        this.onMakingRequest.emit(false);
        this.onResult.emit(LoginStatus.SERVER_ERROR);
    }

    private handleFormErrors(): void {
        this.onResult.emit(LoginStatus.FORM_ERRORS);
        if (this.loginForm.controls['username'].invalid) {
            this.focus('username');
        } else {
            this.focus('password');
        }
    }

    private focus(field: string): void {
        this.elementRef.nativeElement.querySelector('#' + field).focus();
    }
}
