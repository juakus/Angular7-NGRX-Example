import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { DataService } from './../../shared/data.service';
import * as fApp from '../../store/app.reducers'
import * as fAuth from '../../auth/store/auth.reducers'
import * as AuthActions from '../../auth/store/auth.actions'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

    authState: Observable<fAuth.State>;

    constructor(
        private data: DataService,
        private store: Store<fApp.AppState>) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    saveData() {
        this.data.storeRecipes()
            .subscribe(
                (resp) => {
                    console.log(resp);
                }
            );
    }

    getData() {
        this.data.getStoredRecipes();
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

}