import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { AuthorizationService } from './authorization.service';
import { RoutingService } from './../routing/routing.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private authorizationService: AuthorizationService,
        private routingService: RoutingService
    ) { }

    canActivate(destination: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = destination.url.join("/");
        let canAccess: boolean = this.authorizationService.canAccess(url);
        if (!canAccess) {
            this.routingService.toLogout();
        }
        return canAccess;
    }
}
