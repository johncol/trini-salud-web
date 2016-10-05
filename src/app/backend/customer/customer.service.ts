import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UrlService } from './../../shared/url/url.service';
import { SessionService } from './../../shared/session/session.service';
import { BackendResponse } from './../shared/backend.response';

import { CreateCustomerRequest } from './create-customer.request';
import { CreateCustomerResponse } from './create-customer.response';

@Injectable()
export class CustomerService {
    private url: any = {
        create: 'customer'
    };

    constructor(
        private http: Http,
        private urlService: UrlService,
        private sessionService: SessionService
    ) { }

    save(request: CreateCustomerRequest): Observable<BackendResponse<CreateCustomerResponse>> {
        let url: string = this.urlService.build(this.url.create);
        return this.dummyResponse(request)
        // return this.http.post(url, request)
            .map(response => response.json())
            .do(response => console.log(`CustomerService - ${url} - response: `, response));
    }

    private dummyResponse(request: CreateCustomerRequest): Observable<any> {
        console.info('CustomerService.save() dummy response being used');
        return Observable.create(observer => {
            let customerResponse = new CreateCustomerResponse();
            observer.next({
                json: () => new BackendResponse<CreateCustomerResponse>(request.identification.length > 5, 'El cliente con identificacion 1019034461 ya esta registrado', customerResponse)
            });
        });
    }

}
