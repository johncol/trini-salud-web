export class UploadCertificateResponse {
    constructor(
        public success: boolean,
        public message: string,
        public certificateid: string,
        public name: string,
        public date: string,
        public customerid: string,
        public username: string,
        public password: string,
        public file?: Blob
    ) { }
}
