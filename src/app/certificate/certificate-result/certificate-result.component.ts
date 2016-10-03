import { Component, OnInit, Input } from '@angular/core';

import { CertificateResult } from './certificate-result';
import { Certificate } from './certificate-list/certificate';
import { PatientInformation } from './patient-information/patient-information';

@Component({
    selector: 'ts-certificate-result',
    templateUrl: 'certificate-result.component.html'
})
export class CertificateResultComponent implements OnInit {
    result: CertificateResult;

    ngOnInit(): void {
        this.result = new CertificateResult(
            new PatientInformation(
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
            ]
        );
    }
}
