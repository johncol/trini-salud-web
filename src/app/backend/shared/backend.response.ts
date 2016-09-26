export class BackendResponse {
    constructor(
        public status: number,
        public message: string,
        public data: any
    ) { }
}
