export class BackendResponse<T> {
    constructor(
        public success: boolean,
        public message: string,
        public data: T
    ) { }
}
