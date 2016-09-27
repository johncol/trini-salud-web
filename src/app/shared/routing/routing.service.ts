import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './../session/session.service';
import { RoleService } from './../authorization/role.service';

@Injectable()
export class RoutingService {

    constructor(
        private router: Router,
        private roleService: RoleService,
        private sessionService: SessionService
    ) { }

    toLogin(): void {
        this.router.navigate(['login']);
    }

    toCreateCustomer(): void {
        this.router.navigate(['customer', 'create']);
    }

    toUploadCertificate(): void {
        this.router.navigate(['certificate', 'upload']);
    }

    toSearchCertificate(): void {
        this.router.navigate(['certificate', 'search']);
    }

    toCertificate(certificateId: string): void {
        this.router.navigate(['certificate', certificateId]);
    }

    afterLogin(): void {
        if (!this.sessionService.sessionActive()) {
            console.warn('No destination after login if there is no session');
            return;
        } else if (this.roleService.isCustomer()) {
            this.toSearchCertificate();
        } else if (this.roleService.isIpsWorker()) {
            // to dashboard
            this.toCreateCustomer();
        } else {
            throw new Error('RoutingService.afterLogin(): should not get here!');
        }
    }

}