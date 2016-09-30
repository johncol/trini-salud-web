import { Component, OnInit } from '@angular/core';

import { RoutingService } from './../shared/routing/routing.service';

@Component({
    selector: 'ts-logout',
    template: ''
})
export class LogoutComponent implements OnInit {

    constructor(
        private routingService: RoutingService
    ) { }

    ngOnInit(): void {
        console.log('TODO: really logout');
        this.routingService.toLogin();
    }
    
}