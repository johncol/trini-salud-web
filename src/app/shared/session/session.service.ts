import { Injectable } from '@angular/core';

import { BackendResponse } from './../../backend/shared/backend.response';
import { SessionData } from './session-data';
import { AuthenticationRequest } from './../../backend/authentication/authentication.request';
import { AuthenticationResponse } from './../../backend/authentication/authentication.response';

@Injectable()
export class SessionService {
    private sessionData: SessionData = null;

    handle(request: AuthenticationRequest, response: BackendResponse<AuthenticationResponse>): void {
        if (response.success) {
            this.sessionData = new SessionData(request.username, response.data.rol, response.data.token);
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

    role(): string {
        return this.sessionData.rol;
    }

    token(): string {
        return this.sessionData.token;
    }
}
