import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fApp from '../store/app.reducers'
import * as fAuth from '../auth/store/auth.reducers'
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return this.store.select('auth')
            .pipe(
                take(1),  // otherwise the app will send a request after logout
                switchMap(
                    (authState: fAuth.State) => {
                        const copyReq = req.clone({ params: req.params.set('auth', authState.token) });
                        return next.handle(copyReq);
                    }
                ))
    }
}