export class CreateCustomerRequest {
    constructor(
        public identification: string,
        public name: string,
        public password: string
    ) { }
}
