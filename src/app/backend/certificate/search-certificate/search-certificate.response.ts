import { Certificate } from './certificate';
import { Patient } from './patient';

export class SearchCertificateResponse {
    constructor(
        public success: boolean,
        public message: string,
        public patient?: Patient,
        public certificates?: Certificate[]
    ) { }
}
