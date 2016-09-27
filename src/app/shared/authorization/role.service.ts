import { Injectable } from '@angular/core';

import { SessionService } from './../session/session.service';

const Role = {
    IPS_WORKER: 'IPS_WORKER',
    CUSTOMER: 'CUSTOMER'
}

@Injectable()
export class RoleService {

    constructor(
        private sessionService: SessionService
    ) { }

    isIpsWorker(): boolean {
        return this.verifyRole(Role.IPS_WORKER);
    }

    isCustomer(): boolean {
        return this.verifyRole(Role.CUSTOMER);
    }

    private verifyRole(role: string) {
        if (this.sessionService.sessionActive()) {
            return this.sessionService.role() === role;
        }
        return false;
    }
}
