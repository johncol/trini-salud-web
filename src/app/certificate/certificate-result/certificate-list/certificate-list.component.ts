import { Component, OnInit, Input } from '@angular/core';

import { Certificate } from './certificate';
import { UrlService } from './../../../shared/url/url.service';

@Component({
    selector: 'ts-certificate-list',
    templateUrl: 'certificate-list.component.html'
})
export class CertificateListComponent implements OnInit {
    @Input() certificates: Certificate[];

    constructor(private urlService: UrlService) { }

    ngOnInit(): void { }

    buildCertificateUrl(linkId: string): string {
        return this.urlService.build('patient/certificate/' + linkId);
    }
}
