import { Injectable } from '@angular/core';

import { Certificate } from './certificate-list/certificate';
import { PatientInformation } from './patient-information/patient-information';
import { CertificateResult } from './certificate-result';

import { SearchCertificateResponse } from './../../backend/certificate/search-certificate/search-certificate.response';
import { Patient } from './../../backend/certificate/search-certificate/patient';

@Injectable()
export class CertificateResultService {
    result: CertificateResult = null;

    constructor() { }

    save(response: SearchCertificateResponse): void {
        let patient: PatientInformation = this.mapPatientData(response);
        let certificates: Certificate[] = this.mapCertificates(response);
        this.result = new CertificateResult(patient, certificates); 
    }

    get(): CertificateResult {
        if (this.result === null) {
            console.warn('There is no patient data');
        }
        return this.result;
    }

    private mapPatientData(response: SearchCertificateResponse): PatientInformation {
        let patient: Patient = response.patient;
        return new PatientInformation(
            patient.identification,
            patient.name,
            patient.gender,
            patient.age,
            patient.birthdate,
            patient.address,
            patient.phone,
            patient.email,
            patient.eps,
            patient.customerId
        );
    }

    private mapCertificates(response: SearchCertificateResponse): Certificate[] {
        let certificates: Certificate[] = [];
        response.certificates.forEach(certificate => {
            certificates.push(new Certificate(certificate.certificateId, certificate.name));
        });
        return certificates;
    }

}
