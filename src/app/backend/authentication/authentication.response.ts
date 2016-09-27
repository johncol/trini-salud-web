export class AuthenticationResponse {
    constructor(
        public authenticated: boolean,
        public rol?: string,
        public token?: string
    ) { }
}
