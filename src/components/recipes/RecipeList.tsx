<<<<<<< HEAD
import { useEffect } from 'react';
import recipeStore from './RecipeStore'; // ייבוא ה-Store
import { Box, Typography, ListItem, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const RecipeList = () => {
    useEffect(() => {
        recipeStore.fetchRecipes();
    }, []);

    return (
        <Box>
            {recipeStore.recipes.map(recipe => (
                <ListItem 
                    key={recipe.Id} 
                    sx={{ position: 'relative', zIndex: 1 }} 
                >
                    <Typography>{recipe.Categoryid}</Typography>
                    <IconButton 
                        onClick={() => recipeStore.deleteRecipe(recipe.Id)} 
                        sx={{ color: 'inherit' }} 
                    >
=======
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
>>>>>>> 0e4152768b3e371ad10c5b7380423d6246620152
                        <Delete />
                    </IconButton>
                </ListItem>
            ))}
        </Box>
    );
};

export default RecipeList;
