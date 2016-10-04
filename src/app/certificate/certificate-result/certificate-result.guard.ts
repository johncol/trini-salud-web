import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { CertificateResultService } from './certificate-result.service';
import { RoutingService } from './../../shared/routing/routing.service';

@Injectable()
export class CertificateResultGuard implements CanActivate {

    constructor(
        private routingService: RoutingService,
        private certificateResultService: CertificateResultService
    ) { }

    canActivate(): boolean {
        let hasResult: boolean = this.certificateResultService.get() !== null;
        if (!hasResult) {
            this.routingService.toSearchCertificate();
        }
        return hasResult;
    }
}
