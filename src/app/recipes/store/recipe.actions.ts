import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'ADD_RECIPE';

export class SetRecipes implements Action {
    readonly type = SET_RECIPES;

    constructor(public payload: Recipe[]) { }
}

export class AddRecipe implements Action {
    readonly type = ADD_RECIPE;

    constructor(public payload: Recipe) { }
}

export class UpdateRecipe implements Action {
    readonly type = UPDATE_RECIPE;

    constructor(public payload: { index: number, updatedRecipe: Recipe }) { }
}

export class DeleteRecipe implements Action {
    readonly type = DELETE_RECIPE;

    constructor(public payload: number) { }
}

export type RecipeActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe;