import { Certificate } from './certificate';
import { Patient } from './patient';

export class SearchCertificateResponse {
    constructor(
        public patient?: Patient,
        public certificates?: Certificate[]
    ) { }
}
