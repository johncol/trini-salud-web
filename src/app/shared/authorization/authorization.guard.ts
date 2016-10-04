import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router } from '@angular/router';

import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate{

    constructor(
        private authorizationService: AuthorizationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    canActivate(): boolean {
        let url: string = this.router.url;
        let canAccess: boolean = this.authorizationService.canAccess(url);
        console.warn('AuthorizationGuard not working:');
        console.log('this.router.url: ', url);
        console.log('canAccess: ', canAccess);
        return canAccess;
    }
}
