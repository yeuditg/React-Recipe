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
                        <Delete />
                    </IconButton>
                </ListItem>
            ))}
        </Box>
    );
};

export default RecipeList;
