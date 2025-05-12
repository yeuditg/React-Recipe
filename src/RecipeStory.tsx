import axios from "axios"
import { makeAutoObservable } from "mobx"

export type Ingridents= {
    Id: string,
      Name: string,
      Count: number,
      Type: string,
      createdAt: Date,
      updatedAt: Date,
      RecipeId: string
}
    
export type  Instructions={
      Id: string,
      Name: string,
      createdAt: Date,
      updatedAt: Date,
      RecipeId: string 
}
export type RecipeType = {
    Categoryid: string,
Description: string,
Difficulty:number,
Duration: number,
Id: string,
Img: string,
Ingridents:Ingridents[],
Instructions: Instructions[],
Name:string,
UserId: string,
createdAt:Date ,
updatedAt:Date
}
class RecipesStore {
    authorId: string | undefined
    recipelist: RecipeType[] = []
    constructor() {
        makeAutoObservable(this)
    }
    setAuthorId(id: string) {
        this.authorId = id
    }

    async addRecipe(recipe: Partial<RecipeType>) {
        if (!recipe.Name || !recipe.Description || !recipe.Ingridents || !recipe.Instructions) {
            console.error('Missing recipe fields');
            return; // יוצא מהפונקציה אם יש שדות חסרים
        }
        try {
            const res = await axios.post('http://localhost:8080/api/recipe',//לבדוק אם השמות תואמים למה שהשרת רוצה לקבל
                {
                    name: recipe.Name,
                    description: recipe.Description,
                    ingredients: recipe.Ingridents,
                    instructions: recipe.Ingridents
                }, {
                headers: {
                    'user-id': this.authorId
                }
            });
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    }
    async getShowRecipes() {
        try {

            const res = await axios.get('http://localhost:8080/api/recipe');
            this.recipelist =await res.data
           
            console.log(this.recipelist.values())
            console.log(res.data)

        }

       catch (error) {
       
        // כאן נוודא שהשגיאה מטופלת כראוי
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            
            }
        } else {
            console.error('Unexpected error:', error);
        }
      
    }
}
}
export default new RecipesStore()