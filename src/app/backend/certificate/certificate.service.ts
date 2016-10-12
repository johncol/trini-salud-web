import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthenticationService } from './../authentication/authentication.service';
import { BackendResponse } from './../shared/backend.response';
import { LogService } from './../../shared/log/log.service';
import { UrlService } from './../../shared/url/url.service';
import { RoleService } from './../../shared/authorization/role.service';
import { SessionService } from './../../shared/session/session.service';

import { UploadCertificateRequest } from './upload-certificate/upload-certificate.request';
import { UploadCertificateResponse } from './upload-certificate/upload-certificate.response';

import { SearchCertificateResponse } from './search-certificate/search-certificate.response';
import { Patient } from './search-certificate/patient';
import { Certificate } from './search-certificate/certificate';

@Injectable()
export class CertificateService {
    private url: any = {
        upload: 'certificate',
        get: 'certificate?patient=',
        getForCustomer: 'certificate/customer?id=',
    };

    constructor(
        private http: Http,
        private log: LogService,
        private urlService: UrlService,
        private roleService: RoleService,
        private sessionService: SessionService,
        private authenticationService: AuthenticationService
    ) { }

    upload(request: UploadCertificateRequest): Observable<BackendResponse<UploadCertificateResponse>> {
        let url: string = this.urlService.build(this.url.upload);
        return this.http.post(url, request, { headers: this.authenticationService.getAuthenticationHeaders() })
            .map(response => response.json())
            .do(response => this.log.info(`CertificateService - ${url} - response: `, response));
    }

    get(identification: string): Observable<BackendResponse<SearchCertificateResponse>> {
        let url: string = this.roleService.isIpsWorker() ?
            this.urlService.build(this.url.get) + identification:
            this.urlService.build(this.url.getForCustomer) + this.sessionService.username() + '&patient=' + identification;
        return this.http.get(url, { headers: this.authenticationService.getAuthenticationHeaders() })
            .map(response => response.json())
            .do(response => this.log.info(`CertificateService - ${url} - response: `, response));
    }

}
