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
import { CustomerResponse } from './customer.response';

@Injectable()
export class CustomerService {
    private url: any = {
        create: 'customer',
        list: 'customer'
    };

    constructor(
        private http: Http,
        private urlService: UrlService,
        private sessionService: SessionService
    ) { }

    save(request: CreateCustomerRequest): Observable<BackendResponse<CreateCustomerResponse>> {
        let url: string = this.urlService.build(this.url.create);
        return this.saveDummyResponse(request)
        // return this.http.post(url, request)
            .map(response => response.json())
            .do(response => console.log(`CustomerService - ${url} - response: `, response));
    }

    private saveDummyResponse(request: CreateCustomerRequest): Observable<any> {
        console.info('CustomerService.save() dummy response being used');
        return Observable.create(observer => {
            let customerResponse = new CreateCustomerResponse();
            observer.next({
                json: () => new BackendResponse<CreateCustomerResponse>(request.identification.length > 5, 'El cliente con identificacion 1019034461 ya esta registrado', customerResponse)
            });
        });
    }

    list(): Observable<BackendResponse<CustomerResponse[]>> {
        let url: string = this.urlService.build(this.url.list);
        return this.listDummyResponse()
        // return this.http.get(url)
            .map(response => response.json())
            .do(response => console.log(`CustomerService - ${url} - response: `, response));
    }

    private listDummyResponse(): Observable<any> {
        console.info('CustomerService.list() dummy response being used');
        return Observable.create(observer => {
            observer.next({
                json: () => new BackendResponse<CustomerResponse[]>(true, 'Ok', [
                    new CustomerResponse('1', 'Cocacola'),
                    new CustomerResponse('2', 'Adidas'),
                    new CustomerResponse('3', 'Cinecolombia')
                ])
            });
        });
    }

}
