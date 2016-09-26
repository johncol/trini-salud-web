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
        // return Observable.create(observer => {
        //         observer.next(new BackendResponse(200, 'OK', new AuthenticationResponse(request.username === 'admin', 'admin', 'KJH237485JKGJD')))
        //     })
        return this.http.post(url, request)
            .map(response => response.json())
            .do(response => console.log(`AuthenticationService - ${url} - response: `, response))
            .map((response: BackendResponse) => response.data)
            .do(response => this.sessionService.handle(request, response));
    }

}
