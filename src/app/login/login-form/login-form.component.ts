import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
    @Output() onResult: EventEmitter<LoginStatus> = new EventEmitter<LoginStatus>();
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService
    ) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            this.loginService.login(this.loginForm.value)
                .subscribe(authenticated => this.handleLoginResponse(authenticated));
        } else {
            this.onResult.emit(LoginStatus.FORM_ERRORS);
        }
    }

    private handleLoginResponse(authenticated: boolean): void {
        this.loginForm.reset();
        if (authenticated) {
            this.onResult.emit(LoginStatus.AUTHENTICATED);
        } else {
            this.onResult.emit(LoginStatus.NOT_AUTHENTICATED);
        }
    }
}
