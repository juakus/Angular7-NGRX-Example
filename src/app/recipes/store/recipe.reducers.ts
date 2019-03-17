import * as recipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

export interface FeatureState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Lasagna',
            'blah',
            'https://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',
            [
                new Ingredient('Pasta', 10),
                new Ingredient('Meat', 5)
            ]
        ),
        new Recipe(
            'Rusty Chicken Thighs',
            'Gorgeous way to grill chicken',
            'https://dish-environment-prod-contentbucket-10u8bszryovz3.s3.amazonaws.com/assets/s3fs-public/styles/content_image_x_large/public/1353642-Rusty-Chicken-Thighs-Photo-by-KGora-resize.png',
            [
                new Ingredient('Chicken', 3),
                new Ingredient('French Fries', 20)
            ]
        )
    ]
}

export function recipeReducer(state = initialState, action: recipeActions.RecipeActions) {
    switch (action.type) {
        case recipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case recipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case recipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload['index']];
            const updatedRecipe = { ...recipe, ...action.payload['updatedRecipe'] };
            const recipes = [...state.recipes];
            recipes[action.payload['index']] = updatedRecipe;

            return {
                ...state,
                recipes: recipes
            };
        case recipeActions.DELETE_RECIPE:
            const allRecipes = [...state.recipes];
            allRecipes.splice(+action.payload, 1);
            return {
                ...state,
                recipes: allRecipes
            };
        default:
            return state;
    }

}