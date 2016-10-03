import { Component, OnInit, Input } from '@angular/core';

import { PatientInformation } from './patient-information';

@Component({
    selector: 'ts-patient-information',
    templateUrl: 'patient-information.component.html'
})
export class PatientInformationComponent implements OnInit {
    @Input() patient: PatientInformation;

    ngOnInit(): void { }
}
