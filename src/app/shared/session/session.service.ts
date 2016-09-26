import { Injectable } from '@angular/core';

import { SessionData } from './session-data';
import { AuthenticationRequest } from './../../backend/authentication/authentication.request';
import { AuthenticationResponse } from './../../backend/authentication/authentication.response';

@Injectable()
export class SessionService {
    private sessionData: SessionData = null;

    handle(request: AuthenticationRequest, response: AuthenticationResponse): void {
        if (response.authenticated) {
            this.sessionData = new SessionData(request.username, response.rol, response.token);
            console.log('SessionData saved: ', this.sessionData);
        } else {
            this.clean();
        }
    }

    clean(): void {
        this.sessionData = null;
    }

    sessionActive(): boolean {
        return this.sessionData !== null;
    }

    username(): string {
        return this.sessionData.username;
    }

    rol(): string {
        return this.sessionData.rol;
    }

    token(): string {
        return this.sessionData.token;
    }
}
