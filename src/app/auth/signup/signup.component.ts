import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    signupForm: FormGroup;

    constructor(private store: Store<fApp.AppState>) { }

    ngOnInit() {
        this.signupForm = new FormGroup({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
        });
    }

    onSignup() { 
        const signupInfo = this.signupForm.value;
       
        this.store.dispatch(new AuthActions.TrySignup({username: signupInfo.email, password: signupInfo.password}));
    }

}
