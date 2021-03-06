import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from './../session/session.service';
import { RoleService } from './../authorization/role.service';
import { LogService } from './../log/log.service';

@Injectable()
export class RoutingService {

    constructor(
        private router: Router,
        private log: LogService,
        private roleService: RoleService,
        private sessionService: SessionService
    ) { }

    toLogin(): void {
        this.router.navigate(['login']);
    }

    toLogout(): void {
        this.router.navigate(['logout']);
    }

    toDashboard(): void {
        this.router.navigate(['dashboard']);
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

    toCertificate(): void {
        this.router.navigate(['certificate']);
    }

    toSuccessProcess(): void {
        this.router.navigate(['success']);
    }

    toCustomerCreated(): void {
        this.router.navigate(['customer', 'created']);
    }

    afterLogin(): void {
        if (!this.sessionService.sessionActive()) {
            this.log.warn('No destination after login if there is no session');
            return;
        } else if (this.roleService.isCustomer()) {
            this.toSearchCertificate();
        } else if (this.roleService.isIpsWorker()) {
            this.toDashboard();
        } else {
            throw new Error('RoutingService.afterLogin(): should not get here!');
        }
    }

}