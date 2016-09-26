import { Injectable } from '@angular/core';

@Injectable()
export class UrlService {
    private backendUrl: string = 'https://trini-salud-api.herokuapp.com/'

    build(resource: string): string {
        return this.backendUrl + resource;
    }
}
