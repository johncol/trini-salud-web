import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { CustomerCreatedService } from './customer-created.service';
import { RoutingService } from './../../shared/routing/routing.service';

@Injectable()
export class CustomerCreatedGuard implements CanActivate {

    constructor(
        private customerCreatedService: CustomerCreatedService,
        private routingService: RoutingService
    ) { }

    canActivate(): boolean {
        let customerUsername = this.customerCreatedService.getUsername();
        let canAccess: boolean = customerUsername !== null && customerUsername !== undefined;
        if (!canAccess) {
            this.routingService.toCreateCustomer();
        }
        return canAccess;
    }
}
