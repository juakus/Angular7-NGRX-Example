import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fApp from '../../store/app.reducers';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    ingridientForm: FormGroup;
    editMode = false;
    editedItem: Ingredient;

    constructor(
        private store: Store<fApp.AppState>
    ) { }

    ngOnInit() {
        this.ingridientForm = new FormGroup({
            name: new FormControl('', Validators.required),
            amount: new FormControl(0, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
        });

        this.subscription = this.store.select('shoppingList')
            .subscribe(
                data => {
                    if (data.editedIngredientIndex > -1) {
                        this.editedItem = data.editedIngredient;
                        this.editMode = true;
                        this.ingridientForm.setValue({
                            name: this.editedItem.name,
                            amount: this.editedItem.amount
                        });
                    } else {
                        this.editMode = false;
                    }
                }
            );
    }

    onSubmit() {
        const ingName = this.ingridientForm.value.name;
        const ingAmount = this.ingridientForm.value.amount;
        const newIngredient = new Ingredient(ingName, ingAmount);

        if (this.editMode) {
            this.store.dispatch(new ShoppingListActions.UpdateIngredient({ ingredient: newIngredient }));
        } else {
            this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
        }

        this.onClear();
    }

    onClear() {
        this.ingridientForm.reset({ amount: 0 });
        this.editMode = false;
    }

    onDelete() {
        this.store.dispatch(new ShoppingListActions.DeleteIngredient());
        this.onClear();
    }

    ngOnDestroy() { 
        this.subscription.unsubscribe();
    }
    

}