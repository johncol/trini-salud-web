export class AuthenticationResponse {
    constructor(
        public authenticated: boolean,
        public role?: string,
        public token?: string
    ) { }
}
