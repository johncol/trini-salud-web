import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    // private backendUrl: string = 'https://trini-salud-api.herokuapp.com/';
    private backendUrl: string = 'http://localhost:8080/';

    build(resource: string): string {
        return this.backendUrl + resource;
    }
}
