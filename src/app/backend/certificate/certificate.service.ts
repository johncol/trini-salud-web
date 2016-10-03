import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UrlService } from './../../shared/url/url.service';
import { SessionService } from './../../shared/session/session.service';
import { BackendResponse } from './../shared/backend.response';

import { UploadCertificateRequest } from './upload-certificate/upload-certificate.request';
import { UploadCertificateResponse } from './upload-certificate/upload-certificate.response';

@Injectable()
export class CertificateService {
    private url: any = {
        upload: 'patient/certificate'
    };

    constructor(
        private http: Http,
        private urlService: UrlService,
        private sessionService: SessionService
    ) { }

    upload(request: UploadCertificateRequest): Observable<UploadCertificateResponse> {
        let url: string = this.urlService.build(this.url.upload);
        return this.uploadDummyResponse(request)
        // return this.http.post(url, request)
            .map(response => response.json())
            .do(response => console.log(`CertificateService - ${url} - response: `, response))
            .map((response: BackendResponse) => response.data);
    }

    private uploadDummyResponse(request: UploadCertificateRequest): Observable<any> {
        console.info('CertificateService.upload() dummy response being used');
        return Observable.create(observer => {
            let certificateResponse = new UploadCertificateResponse(
                true,
                'Certificado cargado correctamente',
                'certificateid',
                'Resultado de trigliceridos',
                '01/01/2016',
                'customerid',
                '101903441',
                '101903441'
            );
            observer.next({
                json: () => new BackendResponse(200, 'OK', certificateResponse)
            });
        });
    }

}
