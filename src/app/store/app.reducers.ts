import { ActionReducerMap } from '@ngrx/store';

import * as fShoppingList from '../shopping-list/store/shopping-list.reducers';
import * as fAuth from '../auth/store/auth.reducers';

export interface AppState {
    shoppingList: fShoppingList.State,
    auth: fAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fShoppingList.shoppingListReducer,
    auth: fAuth.authReducer
}