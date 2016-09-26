import { Component, OnInit } from '@angular/core';

import { LoginStatus } from './login-form/login-status.enum';

const MESSAGES = {
    emptyFields: 'Debes ingresar tu usuario y contraseña',
    failedAuth: 'Usuario o contraseña incorrecta',
    serverError: 'Sentimos las molestias, ha ocurrido un error, inténtalo de nuevo mas tarde'
};

@Component({
    selector: 'ts-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    errorMessage: string;

    manageResult(loginStatus: LoginStatus): void {
        switch(loginStatus) {
            case LoginStatus.FORM_ERRORS:
                this.errorMessage = MESSAGES.emptyFields;
                break;
            case LoginStatus.SERVER_ERROR:
                this.errorMessage = MESSAGES.serverError;
                break;
            case LoginStatus.NOT_AUTHENTICATED:
                this.errorMessage = MESSAGES.failedAuth;
                break;
            case LoginStatus.AUTHENTICATED:
                this.errorMessage = null;
                console.log('redirecting..');
                break;
            default:
                throw new Error('Unexpected LoginStatus: ' + loginStatus);
        }
    }
    
}