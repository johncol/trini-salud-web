import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

@Injectable()
export class UrlService {
    private backendUrl: string = environment.api;

    build(resource: string): string {
        return this.backendUrl + resource;
    }
}
