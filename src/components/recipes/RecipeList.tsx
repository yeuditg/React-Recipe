import  { useEffect } from 'react';
// import { observer } from 'mobx-react';
import recipeStore from './RecipeStore'; // ייבוא ה-Store
import { Box, Typography, CircularProgress, Alert, ListItem, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const RecipeList =() => {
    useEffect(() => {
        recipeStore.fetchRecipes();
    }, []);
    return (
        <Box>
            {recipeStore.recipes.map(recipe => (
                <ListItem key={recipe.Id}>
                    <Typography>{recipe.Categoryid}</Typography>
                    <IconButton onClick={() => recipeStore.deleteRecipe(recipe.Id)}>
                        <Delete />
                    </IconButton>
                </ListItem>
            ))}
        </Box>
    );
};

export default RecipeList;
