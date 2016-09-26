import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { LoginData } from './login-data';

@Injectable()
export class LoginService {

    login(loginData: LoginData): Observable<boolean> {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(loginData.username === 'admin');
            }, 500);
        });
    }

}
