import { Injectable } from '@angular/core';

@Injectable()
export class CustomerCreatedService {
    private username: string;
    private password: string;

    constructor() { }

    save(username: string, password: string): void {
        this.username = username;
        this.password = password;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

}