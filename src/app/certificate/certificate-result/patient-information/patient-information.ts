export class PatientInformation {
    constructor(
        private identification: string,
        private name: string,
        private gender: string,
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
