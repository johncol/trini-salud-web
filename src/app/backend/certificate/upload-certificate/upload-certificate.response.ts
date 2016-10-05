export class UploadCertificateResponse {
    constructor(
        public success: boolean,
        public message: string,
        public certificateId: string,
        public certificateName: string,
        public customerId: string
        // public date: string,
        // public username: string,
        // public password: string
    ) { }
}
