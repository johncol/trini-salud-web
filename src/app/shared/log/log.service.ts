import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';

@Injectable()
export class LogService {
    enabled: boolean = environment.log;

    private static LOG_TYPE = {
        info: 'info',
        warn: 'warn',
        error: 'error'
    };

    info(message: string, value?: any): void {
        this.print(LogService.LOG_TYPE.info, message, value);
    }

    warn(message: string, value?: any): void {
        this.print(LogService.LOG_TYPE.warn, message, value);
    }

    error(message: string, value?: any): void {
        this.print(LogService.LOG_TYPE.error, message, value);
    }

    private print(method: any, message: string, value?: any): void {
        if (this.enabled) {
            if (value) {
                console[method](message, value);
            } else {
                console[method](message);
            }
        }
    }

}
