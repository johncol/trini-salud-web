import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthenticationService } from './../authentication/authentication.service';
import { BackendResponse } from './../shared/backend.response';
import { UrlService } from './../../shared/url/url.service';
import { LogService } from './../../shared/log/log.service';

import { CreateCustomerRequest } from './create-customer.request';
import { CreateCustomerResponse } from './create-customer.response';
import { CustomerResponse } from './customer.response';

@Injectable()
export class CustomerService {
    private url: any = {
        create: 'customer',
        list: 'customer'
    };

    constructor(
        private http: Http,
        private log: LogService,
        private urlService: UrlService,
        private authenticationService: AuthenticationService
    ) { }

    save(request: CreateCustomerRequest): Observable<BackendResponse<CreateCustomerResponse>> {
        let url: string = this.urlService.build(this.url.create);
        return this.http.post(url, request, { headers: this.authenticationService.getAuthenticationHeaders() })
            .map(response => response.json())
            .do(response => this.log.info(`CustomerService - ${url} - response: `, response));
    }

    list(): Observable<BackendResponse<CustomerResponse[]>> {
        let url: string = this.urlService.build(this.url.list);
        return this.http.get(url, { headers: this.authenticationService.getAuthenticationHeaders() })
            .map(response => response.json())
            .do(response => this.log.info(`CustomerService - ${url} - response: `, response));
    }

}
