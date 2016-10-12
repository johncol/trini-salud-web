import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AuthenticationService } from './../authentication/authentication.service';
import { BackendResponse } from './../shared/backend.response';
import { UrlService } from './../../shared/url/url.service';

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
    };

    constructor(
        private http: Http,
        private urlService: UrlService,
        private authenticationService: AuthenticationService
    ) { }

    upload(request: UploadCertificateRequest): Observable<BackendResponse<UploadCertificateResponse>> {
        let url: string = this.urlService.build(this.url.upload);
        // return this.uploadDummyResponse(request)
        return this.http.post(url, request, { headers: this.authenticationService.getAuthenticationHeaders() })
            .map(response => response.json())
            .do(response => console.log(`CertificateService - ${url} - response: `, response));
    }

    get(identification: string): Observable<BackendResponse<SearchCertificateResponse>> {
        let url: string = this.urlService.build(this.url.get) + identification;
        return this.http.get(url, { headers: this.authenticationService.getAuthenticationHeaders() })
        // return this.getDummyResponse(identification)
            .map(response => response.json())
            .do(response => console.log(`CertificateService - ${url} - response: `, response));
    }

    private getDummyResponse(identification: string): Observable<any> {
        console.info('CertificateService.get() dummy response being used');
        return Observable.create(subscriber => {
            let certificateResponse = new SearchCertificateResponse(new Patient(
                '1019034461',
                'John Alexander Cely Suárez',
                'Hombre',
                27,
                '24 de junio de 1989',
                'Avenida calle 26 #44 A39 Apto 906',
                '305 772 4370',
                'john.19col@gmail.com',
                'eps',
                '1019034461'
            ),[
                new Certificate('1019034461-33432', 'Examen de trigliceridos'),
                new Certificate('1019034461-87657', 'Examen de glucosa concentrada')
            ]);
            let found: boolean = identification === '1019034461';
            subscriber.next({
                json: () => new BackendResponse<SearchCertificateResponse>(found, found ? 'found' : 'no found', certificateResponse)
            });
        });
    }

    private uploadDummyResponse(request: UploadCertificateRequest): Observable<any> {
        console.info('CertificateService.upload() dummy response being used');
        return Observable.create(subscriber => {
            let response: BackendResponse<UploadCertificateResponse>;
            if (request.patient.identification === '1019034461') {
                if (!request.customer) {
                    response = new BackendResponse<UploadCertificateResponse>(false, 'No se encontro información del paciente "1019034461"');
                } else {
                    response = new BackendResponse<UploadCertificateResponse>(true, 'Certificado cargado correctamente', new UploadCertificateResponse(
                        'certificateid',
                        'Resultado de trigliceridos'
                    ));
                }
            } else {
                response = new BackendResponse<UploadCertificateResponse>(false, 'Ocurrio un error guardando el certificado');
            }
            subscriber.next({
                json: () => response
            });
        });
    }

}
