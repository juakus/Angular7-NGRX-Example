import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

    signinForm: FormGroup;

    constructor(private store: Store<fApp.AppState>) { }

    ngOnInit() {
        this.signinForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSignin() {
        const signupInfo = this.signinForm.value;
        this.store.dispatch(new AuthActions.TrySignin({username: signupInfo.email, password: signupInfo.password}));
     }

}
