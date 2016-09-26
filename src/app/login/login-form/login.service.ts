import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginData } from './login-data';
import { AuthenticationService } from './../../backend/authentication/authentication.service';
import { AuthenticationRequest } from './../../backend/authentication/authentication.request';

@Injectable()
export class LoginService {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    login(loginData: LoginData): Observable<boolean> {
        let request = new AuthenticationRequest(loginData.username, loginData.password);
        return this.authenticationService.authenticate(request)
            .map(response => response.authenticated);
        // return Observable.create(observer => {
        //     setTimeout(() => {
        //         observer.next(loginData.username === 'admin');
        //     }, 500);
        // });
    }

}
