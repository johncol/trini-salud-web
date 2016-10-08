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

    getGender(): string {
        if (this.gender === 'f') {
            return 'Mujer';
        } else if (this.gender === 'm') {
            return 'Hombre';
        }
        return 'Sexo indefinido';
    }
}
