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

import { SearchCertificateResponse } from './search-certificate/search-certificate.response';
import { Patient } from './search-certificate/patient';
import { Certificate } from './search-certificate/certificate';

@Injectable()
export class CertificateService {
    private url: any = {
        upload: 'certificate',
        get: 'certificate?identification=',
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

    get(identification: string): Observable<SearchCertificateResponse> {
        let url: string = this.urlService.build(this.url.get) + identification;
        // return this.http.get(url)
        return this.getDummyResponse(identification)
            .map(response => response.json())
            .do(response => console.log(`CertificateService - ${url} - response: `, response))
            .map((response: BackendResponse) => response.data);
    }

    private getDummyResponse(identification: string): Observable<any> {
        console.info('CertificateService.get() dummy response being used');
        return Observable.create(subscriber => {
            let certificateResponse = new SearchCertificateResponse(identification === '1019034461', 'Ok', new Patient(
                '1019034461',
                'John Alexander Cely Suárez',
                'Hombre',
                27,
                1132132123132,
                'Avenida calle 26 #44 A39 Apto 906',
                '305 772 4370',
                'john.19col@gmail.com',
                'eps',
                '1019034461'
            ),[
                new Certificate('1019034461-33432', 'Examen de trigliceridos'),
                new Certificate('1019034461-87657', 'Examen de glucosa concentrada')
            ]);
            subscriber.next({
                json: () => new BackendResponse(200, 'OK', certificateResponse)
            });
        });
    }

    private uploadDummyResponse(request: UploadCertificateRequest): Observable<any> {
        console.info('CertificateService.upload() dummy response being used');
        return Observable.create(subscriber => {
            let certificateResponse = new UploadCertificateResponse(
                true,
                'Certificado cargado correctamente',
                'certificateid',
                'Resultado de trigliceridos',
                'customerid'
            );
            subscriber.next({
                json: () => new BackendResponse(200, 'OK', certificateResponse)
            });
        });
    }

}
