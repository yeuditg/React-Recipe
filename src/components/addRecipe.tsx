<<<<<<< HEAD
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
=======
import { useForm } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AddRecipe = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data:any) => {
        try {
            await axios.post("http://localhost:8080/api/recipe", data);
            alert("מתכון נוסף בהצלחה!");
        } catch (error) {
            console.error("Error adding recipe:", error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                הוספת מתכון
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("title")} label="כותרת מתכון" required fullWidth margin="normal" />
                <TextField {...register("ingredients")} label="מצרכים" required fullWidth margin="normal" />
                <TextField {...register("instructions")} label="הוראות הכנה" required fullWidth margin="normal" multiline rows={4} />
                <Button type="submit" variant="contained" color="primary">הוסף מתכון</Button>
            </form>
        </div>
    );
};

export default AddRecipe;


// import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
// import { array, object, string } from "yup";
// import { useContext, useEffect, useState } from "react";
// import { Box, Button, Modal, TextField } from "@mui/material";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { Outlet, useNavigate } from "react-router-dom";
// import { CurrentContext } from "./user";
// import RecipeStory, { RecipeType } from "./RecipeStory";

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };
// const schema = object({
//     title: string().required('recipe name is require'),
//     description: string(),
//     ingredients: array()
//     .of(string().required('Ingredient is required'))
//     .required('Ingredients list is required') 
//     .min(1, 'At least one ingredient is required'), 
//     instructions:string().required('instructions is require').min(3,'instuctions must be at least 3 letters')
// })
// const AddRecipe=()=>{
//     const context=useContext(CurrentContext);
//     const [click,setClick]=useState(false)
//     const navigate=useNavigate()
//     const onSubmit: SubmitHandler<Partial<RecipeType>> = (data) => {
//         RecipeStory.addRecipe(data)  
//         setClick(false)
//         reset()
//         navigate('/allRecipes')
//     }
//     useEffect(() => {
//         setClick(false)
//         RecipeStory.setAuthorId(context?.currentUser.id);
//     }, [context]);
//     const { register, handleSubmit,reset,control, watch, formState: { errors }
//     } = useForm({ resolver: yupResolver(schema) })
//     const { fields, append, remove } = useFieldArray({
//         control,
//         name: "ingredients" 
//     });
//     return(
//         <>
//          <Button style={{ position: 'absolute',top: 70, right: 10 ,color:'black',backgroundColor:'pink'}} onClick={()=>setClick(true)}>add recipe </Button>
//         <Modal
//           open={click}
//           onClose={() => setClick(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div> <TextField {...register('title')} placeholder="title" />
//                 {errors.title && <span>{errors.title.message}</span>}</div>
//             <div><TextField {...register('description')} placeholder="description" />
//                 {errors.description && <span>{errors.description.message}</span>}</div>
//                 <div>
//                     {fields.map((item, index) => (
//                         <div key={item.id}>
//                             <TextField
//                                 {...register(`ingredients.${index}`)} // Register input for ingredients
//                                 placeholder="Ingredient"
//                             />
//                             <Button type="button" onClick={() => remove(index)}>Remove</Button>
//                         </div>
//                     ))}
//                     <button type="button" onClick={() => append('')}>Add Ingredient</button>
//                     {errors.ingredients && <span>{errors.ingredients.message}</span>}
//                 </div>
//                 <div><TextField multiline {...register('instructions')} placeholder="instructions" />
//                 {errors.instructions && <span>{errors.instructions.message}</span>}</div>
//             <Button type="submit">Save</Button>
//         </form>
//           </Box>
//         </Modal>
//         <Outlet/> 
// </>)
// }
// export default AddRecipe

>>>>>>> 0e4152768b3e371ad10c5b7380423d6246620152
