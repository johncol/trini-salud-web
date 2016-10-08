export class Patient {
    constructor(
        public identification: string,
        public name: string,
        public gender: string,
        public age: number,
        public birthdate: string,
        public address: string,
        public phone: string,
        public email: string,
        public eps: string,
        public customerId: string
    ) { }
}
