import { Certificate } from './certificate-list/certificate';
import { PatientInformation } from './patient-information/patient-information';

export class CertificateResult {
    constructor(
        private patient: PatientInformation,
        private certificates: Certificate[]
    ) { }
}
