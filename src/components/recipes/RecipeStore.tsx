// store.js
import { makeAutoObservable } from "mobx";
import  { RecipeType } from '../RecipeStory'

class RecipeStore {
    recipes:RecipeType[] = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    fetchRecipes = async () => {
        this.loading = true;
        this.error = null;
        try {
            const response = await fetch('http://localhost:8080/api/recipe');
            this.recipes = await response.json();
        } catch (err:any) {
            this.error = err.message;
        } finally {
            this.loading = false;
        }
    }

    deleteRecipe = async (recipeId:any) => {
        try {
            await fetch(`http://localhost:8080/api/recipe/delete/${recipeId}`, {
                method: 'POST',
            });
            this.recipes = this.recipes.filter(recipe => recipe.Id !== recipeId);
        } catch (err:any) {
            this.error = err.message;
        }
    }
}

const recipeStore = new RecipeStore();
export default recipeStore;
