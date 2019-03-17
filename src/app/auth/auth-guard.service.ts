import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fApp from '../store/app.reducers';
import * as fAuth from './store/auth.reducers';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fApp.AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .pipe(
                take(1),
                map((authState: fAuth.State) => { return authState.authenticated })
            )

    }
}