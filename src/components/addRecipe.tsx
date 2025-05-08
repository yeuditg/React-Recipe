import axios from "axios";
import { useContext, useState } from "react";
import { recipeContext } from "./recipeis-context";
import { Recipe } from "./recipe-model";
import { context } from "./user-context";

const initRecipe: Recipe = {
    Id: 0,
    Name: "גבינה",
    Img: "גבינה.png",
    Duration: 60,
    Difficulty: 2,
    Description: "עוגה לשבועות",
    Categoryid: 2,
    UserId: 5,
    Ingridents: [],
    Instructions: []
};

const AddRecipy = () => {
    const [newRecipy, setNewRecipy] = useState<Recipe>(initRecipe);
    const { user } = useContext(context);
    const { recipes, setRecipes } = useContext(recipeContext);

    const addRecipy = (recipy: any) => {
        recipy.UserId = user.Id;
        delete recipy.Id;
        axios.post("http://localhost:8080/api/recipe", recipy)
            .then(({ data }) => setRecipes({ ...recipes, data }))
            .catch((err) => console.error(err));
    }

    const saveRecipyChanges = (field: string, value: string) => {
        if (field === "Duration" || field === "Difficulty" || field === "Categoryid") {
            setNewRecipy({ ...newRecipy, [field]: parseInt(value) });
        }
        else if (field == "Ingridents" || field == "Instructions") {
           const arrOf = value.split(",");
            setNewRecipy({ ...newRecipy, [field]: arrOf });
        }
        else {
            
        }
    }

    return <>
        <div>
            <label>Name : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Name", target.value)} />
        </div>
        <div>
            <label>Img : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Img", target.value)} />

        </div>
        <div>
            <label>Duration : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Duration", target.value)} />
        </div>
        <div>
            <label>Difficulty : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Difficulty", target.value)} />
        </div>
        <div>
            <label>Description : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Description", target.value)} />
        </div>
        <div>
            <label>Categoryid : </label>
            <input type="number" onChange={({ target }) => saveRecipyChanges("Categoryid", target.value)} />
        </div>
        <div>
            <p>Ingridents : </p>
            <div>
                <label>Name : </label>
                <input type="text" />
            </div>
            <div>
                <label>Count : </label>
                <input type="number" />
            </div>
            <div>
                <label>Type : </label>
                <input type="text" />
            </div>
        </div>
        <div>
            <label>Instructions : </label>
            <input type="text" onChange={({ target }) => saveRecipyChanges("Instructions", target.value)} />
        </div>

        <button onClick={() => addRecipy(newRecipy)}>add</button>
    </>
}
export default AddRecipy;    