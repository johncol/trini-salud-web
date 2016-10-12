import { Injectable } from '@angular/core';

import { BackendResponse } from './../../backend/shared/backend.response';
import { SessionData } from './session-data';
import { AuthenticationRequest } from './../../backend/authentication/authentication.request';
import { AuthenticationResponse } from './../../backend/authentication/authentication.response';

import { LogService } from './../log/log.service';

@Injectable()
export class SessionService {
    private sessionData: SessionData = null;

    constructor(
        private log: LogService
    ) { }

    handle(request: AuthenticationRequest, response: BackendResponse<AuthenticationResponse>): void {
        if (response.success) {
            this.sessionData = new SessionData(request.username, request.password, response.data.role, response.data.token);
            this.log.info('SessionData saved: ', this.sessionData);
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

    password(): string {
        return this.sessionData.password;
    }

    role(): string {
        return this.sessionData.rol;
    }

    token(): string {
        return this.sessionData.token;
    }
}
