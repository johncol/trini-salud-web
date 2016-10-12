import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { LogService } from './../../shared/log/log.service';
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
        private log: LogService,
        private sessionService: SessionService
    ) { }

    authenticate(request: AuthenticationRequest): Observable<BackendResponse<AuthenticationResponse>> {
        let url: string = this.urlService.build(this.url.authenticate);
        return this.http.post(url, request)
            .map(response => response.json())
            .do(response => this.log.info(`AuthenticationService - ${url} - response: `, response))
            .do(response => this.sessionService.handle(request, response));
    }

    getAuthenticationHeaders(): Headers {
        let headers: Headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.sessionService.username() + ":" + this.sessionService.password()));
        return headers;
    }

}
