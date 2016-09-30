export class CreateCustomerRequest {
    constructor(
        public identification: string,
        public name: string,
        public email: string,
        public phone: string,
        public password: string
    ) { }
}
