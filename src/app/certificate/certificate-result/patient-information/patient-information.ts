export class PatientInformation {
    constructor(
        private identification: string,
        private name: string,
        private gender: string,
        private age: number,
        private birthdate: string,
        private address: string,
        private phone: string,
        private email: string,
        private eps: string,
        private customer: string
    ) { }
}
