import { Component, OnInit, Input } from '@angular/core';

import { CertificateResult } from './certificate-result';
import { Certificate } from './certificate-list/certificate';
import { PatientInformation } from './patient-information/patient-information';

import { CertificateResultService } from './certificate-result.service';

@Component({
    selector: 'ts-certificate-result',
    templateUrl: 'certificate-result.component.html'
})
export class CertificateResultComponent implements OnInit {
    result: CertificateResult;

    constructor(
        private certificateResultService: CertificateResultService
    ) { }

    ngOnInit(): void {
        this.result = this.certificateResultService.get();
    }
}
