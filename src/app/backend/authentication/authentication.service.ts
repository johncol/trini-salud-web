import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UrlService } from './../../shared/url/url.service';
import { SessionService } from './../../shared/session/session.service';
import { BackendResponse } from './../shared/backend.response';
import { AuthenticationResponse } from './authentication.response';
import { AuthenticationRequest } from './authentication.request';

@Injectable()
export class AuthenticationService {
    private url: any = {
        authenticate: 'authentication/on',
        deauthenticate: 'authentication/off'
    };

    constructor(
        private http: Http,
        private urlService: UrlService,
        private sessionService: SessionService
    ) { }

    authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
        let url: string = this.urlService.build(this.url.authenticate);
        return this.dummyResponse(request)
        // return this.http.post(url, request)
            .map(response => response.json())
            .do(response => console.log(`AuthenticationService - ${url} - response: `, response))
            .map((response: BackendResponse) => response.data)
            .do(response => this.sessionService.handle(request, response));
    }

    private dummyResponse(request: AuthenticationRequest): Observable<any> {
        return Observable.create(observer => {
            console.info('AuthenticationService.authenticate() dummy response being used');
            let authResponse: AuthenticationResponse;
            if (request.username === 'admin') {
                authResponse = new AuthenticationResponse(true, 'IPS_WORKER', 'KJH237485JKGJD');
            } else if (request.username === 'noadmin') {
                authResponse = new AuthenticationResponse(true, 'CUSTOMER', 'KJH237485JKGJD');
            } else {
                authResponse = new AuthenticationResponse(false);
            }
            observer.next({
                json: () => new BackendResponse(200, 'OK', authResponse)
            });
        });
    }

}
