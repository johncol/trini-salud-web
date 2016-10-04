import { Injectable } from '@angular/core';

import { SessionService } from './../session/session.service';
import { RoleService } from './role.service';

@Injectable()
export class AuthorizationService {

    constructor(
        private sessionService: SessionService,
        private roleService: RoleService
    ) { }

    canAccess(path: string): boolean {
        if (path === '/' || path === '/login' || path === '/logout') {
            return true;
        } else if (!this.sessionService.sessionActive()) {
            return false;
        } else if (this.roleService.isIpsWorker()) {
            return true;
        } else if (this.roleService.isCustomer()) {
            return this.canAccessCustomer(path);
        }
        throw new Error('AuthorizationService.canAccess(): it should not get here!');
    }

    private canAccessCustomer(path: string): boolean {
        return path === '/certificate' || path === '/certificate/search';
    }

}
