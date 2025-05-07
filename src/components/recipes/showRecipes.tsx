import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RecipeType } from "../RecipeStory";
import RecipesStore from "../RecipeStory";

const ShowRecipes = () => {
    const [currentRecipe, setCurrentRecipe] = useState<RecipeType | null>(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchRecipes = async () => {
            await RecipesStore.getShowRecipes();
        };
        fetchRecipes();
    }, []);

    const handleClick = (recipe: RecipeType) => {
        setCurrentRecipe(recipe);
    };
    return (
        <>
            <Box display="flex">
                <Box flex={1} padding={8}>
                    <Typography variant="h4" style={{ color: "pink" }}>All Recipes</Typography>
                    <div>
                        {RecipesStore.recipelist.map((recipe: RecipeType, index) => (
                            <div key={index} style={{ border: '3px solid pink' }} onClick={() => handleClick(recipe)}>
                                {recipe.Name} | {recipe.Difficulty}
                               <Link to={"/showRecipes/RecipeList"}>edit</Link>
                            </div>
                        ))}
                    </div>
                </Box>
                <Box flex={1} padding={13} style={{ overflowY: 'auto' }}>
                </Box>
                <img
                    src='src/images/cookiess.png'
                    alt="Description of Image"
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        zIndex: -100
                    }}
                />
            </Box>
            <Link to={"/showRecipes/addRecipe"}>add</Link>
            <Outlet />
        </>
    );
};

export default ShowRecipes;
