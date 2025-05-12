import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import RecipeFilter from './FilterRecipe'; 
import { type RecipeType } from './RecipeStory'; 
import { Outlet, useNavigate } from 'react-router-dom'; // ייבוא

const ShowRecipes = () => {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterDuration, setFilterDuration] = useState('');
    const [filterDifficulty, setFilterDifficulty] = useState('');
    const [filterUserId, setFilterUserId] = useState('');
    const navigate = useNavigate(); // יצירת משתנה ניווט

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/recipe');
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const filteredRecipes = recipes.filter((recipe: RecipeType) => {
        return (
            (filterCategory ? recipe.Categoryid.toString() === filterCategory : true) &&
            (filterDuration !== '' ? recipe.Duration.toString() <= filterDuration : true) &&
            (filterDifficulty ? recipe.Difficulty.toString() === filterDifficulty : true) &&
            (filterUserId ? recipe.UserId === filterUserId : true)
        );
    });

    return (
        <div style={{ padding: '20px' }}>
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                 <Outlet/>
                    <RecipeFilter 
                        filterCategory={filterCategory} 
                        setFilterCategory={setFilterCategory} 
                        filterDifficulty={filterDifficulty}
                        setFilterDifficulty={setFilterDifficulty}
                        filterUserId={filterUserId}
                        setFilterUserId={setFilterUserId}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => navigate('showRecipes/addRecipe')} 
                        style={{ marginBottom: '20px' }}
                    >
                        הוסף מתכון
                    </Button>
                    <Grid container spacing={3}>
                        {filteredRecipes.length > 0 ? (
                            filteredRecipes.map((recipe: RecipeType) => (
                                <Grid item xs={12} sm={6} md={4} key={recipe.Id}>
                                    <Card sx={{ margin: 2, textAlign: 'right' }}>
                                        <CardContent>
                                            <Typography variant="h5" gutterBottom>{recipe.Name}</Typography>
                                            <Typography variant="body2" paragraph>{recipe.Description}</Typography>
                                            <Typography variant="body2" gutterBottom> רמת קושי - {recipe.Difficulty}</Typography>
                                            <Typography variant="body2" gutterBottom> זמן הכנה - {recipe.Duration} דקות </Typography>
                                            <Typography variant="body2" gutterBottom> {recipe.Categoryid} - סוג</Typography>
                                            <img src={recipe.Img} alt={recipe.Name} style={{ width: '100%', height: 'auto' }} />
                                            
                                            <Typography variant="h6" gutterBottom>מרכיבים</Typography>
                                            {recipe.Ingridents && recipe.Ingridents.length > 0 ? (
                                                recipe.Ingridents.map((ing) => (
                                                    <Typography key={`${recipe.Id}-${ing.Name}`} style={{ textAlign: 'right', position: 'relative' }}>
                                                        {ing.Name} - {ing.Count} {ing.Type}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <li>אין מרכיבים זמינים</li>
                                            )}

                                            <Typography variant="h6" gutterBottom>הוראות הכנה</Typography>
                                            {recipe.Instructions && recipe.Instructions.length > 0 ? (
                                                recipe.Instructions.map((instruction, idx) => (
                                                    <Typography key={idx} variant="body2">
                                                        {instruction.Name}
                                                    </Typography>
                                                ))
                                            ) : (
                                                <Typography variant="body2">אין הוראות הכנה זמינות</Typography>
                                            )}
                                            <Button 
                                                variant="contained" 
                                                color="secondary" 
                                                onClick={() => navigate(`/showRecipes/editRecipe/${recipe.Id}`)} 
                                                style={{ marginTop: '10px' }}
                                            >
                                                עדכן מתכון
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1" textAlign="center">אין מתכונים זמינים.</Typography>
                        )}
                    </Grid>
                   
                </>
            )}
        </div>
    );
};
export default ShowRecipes;
