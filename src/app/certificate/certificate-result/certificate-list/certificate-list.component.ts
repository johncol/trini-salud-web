import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Certificate } from './certificate';
import { UrlService } from './../../../shared/url/url.service';

declare let $: any;

@Component({
    selector: 'ts-certificate-list',
    templateUrl: 'certificate-list.component.html'
})
export class CertificateListComponent implements OnInit {
    @Input() certificates: Certificate[];

    constructor(
        private urlService: UrlService,
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        setTimeout(() => {
            $(this.elementRef.nativeElement).find('[data-toggle]').tooltip();
        }, 500);
    }

    buildCertificateUrl(linkId: string): string {
        return this.urlService.build('certificate/' + linkId);
    }
}
