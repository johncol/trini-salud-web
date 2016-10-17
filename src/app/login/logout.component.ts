import { Component, OnInit } from '@angular/core';

import { RoutingService } from './../shared/routing/routing.service';
import { SessionService } from './../shared/session/session.service';

@Component({
    selector: 'ts-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(
        private routingService: RoutingService,
        private sessionService: SessionService
    ) { }

    ngOnInit(): void {
        this.sessionService.clean();
        this.routingService.toLogin();
    }

}