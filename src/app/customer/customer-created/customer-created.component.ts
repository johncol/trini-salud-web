import { Component, OnInit } from '@angular/core';

import { CustomerCreatedService } from './customer-created.service';

@Component({
    selector: 'ts-customer-created',
    templateUrl: 'customer-created.component.html'
})
export class CustomerCreatedComponent implements OnInit {
    username: string;
    password: string;
    hiddenCharacter: string = 'x';
    hiddenPassword: string;
    realPassword: string;

    constructor(
        private customerCreatedService: CustomerCreatedService
    ) { }

    ngOnInit(): void {
        this.username = this.customerCreatedService.getUsername();
        this.realPassword = this.customerCreatedService.getPassword();
        this.hiddenPassword = this.buildHiddenPassword(this.realPassword.length);
        this.password = this.hiddenPassword;
    }

    toggle(show: boolean): void {
        this.password = show ? this.realPassword : this.hiddenPassword;
    }

    private buildHiddenPassword(length: number): string {
        return Array(length).fill(this.hiddenCharacter).join('');
    }
}
