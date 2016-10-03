import { CertificateData } from './certificate-data'
import { PatientData } from './patient-data'

export class UploadCertificateRequest {
    constructor(
        public patient: PatientData,
        public certificate: CertificateData,
        public customer: string
    ) { }
}
