import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipeRes, categoriesRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/recipe/${id}`),
          axios.get("http://localhost:8080/api/category"),
        ]);
        setRecipe(recipeRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e, field) => {
    setRecipe(prev => ({ ...prev, [field]: e.target.value }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      Ingridents: [...prev.Ingridents, { Name: '', Count: '', Type: '' }],
    }));
  };

  const removeIngredient = (index) => {
    const updatedIngredients = recipe.Ingridents.filter((_, i) => i !== index);
    setRecipe(prev => ({ ...prev, Ingridents: updatedIngredients }));
  };

  const handleSave = async () => {
    const currentUserId = sessionStorage.getItem("userId");
    const recipeOwnerId = recipe ? recipe.UserId : null;
    if (!recipeOwnerId) {
      alert("לא ניתן למצוא את בעל המתכון.");
      return;
    }

    if (String(currentUserId) !== String(recipeOwnerId)) {
      alert("אין לך הרשאה לערוך את המתכון הזה.");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/recipe/edit`, recipe);
      navigate('/');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleDelete = async () => {
    const currentUserId = sessionStorage.getItem("userId");
    const recipeOwnerId = recipe ? recipe.UserId : null;

    if (currentUserId != recipeOwnerId) {
      alert("אין לך הרשאה למחוק את המתכון הזה.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/recipe/delete/${id}`);
      alert("Recipe deleted successfully");
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !recipe) {
    return (
      <Typography color="error" align="center">
        {error || "לא נמצא מתכון"}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#fafafa', p: 4, borderRadius: 2, opacity: "80%" }} >
      <Typography variant="h4" align="center" gutterBottom color="gold">עריכת מתכון</Typography>
      <Typography variant="h6" align="center">בעל המתכון: {recipe.UserId}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="שם המתכון"
            value={recipe.Name}
            onChange={(e) => handleChange(e, "Name")}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="תיאור"
            value={recipe.Description}
            onChange={(e) => handleChange(e, "Description")}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel id="Categoryid-label">קטגוריה</InputLabel>
            <Select
              labelId="Categoryid-label"
              name="Categoryid"
              value={recipe.Categoryid ? recipe.Categoryid.toString() : ''}
              onChange={(e) => handleChange(e, "Categoryid")}
            >
              {categories.map((item) => (
                <MenuItem key={item.Id} value={item.Id}>{item.Name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="דרגת קושי"
            value={recipe.Difficulty}
            onChange={(e) => handleChange(e, "Difficulty")}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="משך זמן הכנה (דקות)"
            value={recipe.Duration}
            onChange={(e) => handleChange(e, "Duration")}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">מצרכים</Typography>
          {recipe.Ingridents.map((ingredient, index) => (
            <Paper key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="שם"
                    value={ingredient.Name}
                    onChange={(e) => handleChange(e, `Ingridents[${index}].Name`)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="כמות"
                    value={ingredient.Count}
                    onChange={(e) => handleChange(e, `Ingridents[${index}].Count`)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="סוג"
                    value={ingredient.Type}
                    onChange={(e) => handleChange(e, `Ingridents[${index}].Type`)}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton onClick={() => removeIngredient(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Button variant="contained" onClick={addIngredient} startIcon={<AddIcon />}>הוסף מצרך</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>שמור מתכון</Button>
          <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, ml: 2 }}>מחק מתכון</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditRecipe;
