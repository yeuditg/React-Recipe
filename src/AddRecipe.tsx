import { useState, useEffect } from "react";
import { Box, Container, TextField, Button, Typography, Snackbar, Paper, MenuItem } from "@mui/material";
import axios from "axios";
import MuiAlert, { type AlertProps } from '@mui/material/Alert';
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddRecipe = () => {
  const [categories, setCategories] = useState([]);
  const [recipe, setRecipe] = useState({
    Id: 0,
    Name: "",
    Description: "",
    Difficulty: 1,
    Duration: 30,
    Categoryid: 1,
    UserId: 1, 
    Img: "", 
    Ingridents: [{ Name: "", Count: "", Type: "" }],
    Instructions: []
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get<any>("http://localhost:8080/api/category");
        setCategories(res.data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updatedIngridents = [...recipe.Ingridents];
    updatedIngridents[index][field] = field === "Count" ? parseInt(value) : value; // המרת Count למספר
    setRecipe({ ...recipe, Ingridents: updatedIngridents });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, Ingridents: [...recipe.Ingridents, { Name: "", Count: "", Type: "" }] });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!recipe.Name || !recipe.Description || !recipe.Difficulty || !recipe.Duration || 
        isNaN(recipe.Difficulty) || isNaN(recipe.Duration) || !recipe.Categoryid) {
      newErrors.general = "יש למלא את כל השדות החיוניים";
    }
    recipe.Ingridents.forEach((ing, index) => {
      if (!ing.Name || ing.Count <= 0 || !ing.Type) {
        newErrors[`ingredient${index}`] = "יש למלא את כל השדות של המצרך";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      const res = await axios.post<any>("http://localhost:8080/api/recipe", recipe);
      setSnackbarMessage('המתכון נוסף בהצלחה!');
      setSnackbarSeverity('success');
      console.log("המתכון החדש:", res.data);
    } catch (error) {
      console.log("שגיאה בשמירת מתכון:", error);
      setSnackbarMessage('שגיאה בהוספת המתכון. אנא נסה שוב.');
      setSnackbarSeverity('error');
    } finally {
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 2 }}>
      <Container maxWidth="lg">
        <Paper elevation={6} sx={{ padding: 4 }}>
          <Typography variant="h4" align="center">הוספת מתכון</Typography>
          <TextField label="שם המתכון" name="Name" value={recipe.Name} onChange={handleChange} fullWidth error={!!errors.general} helperText={errors.general} />
          <TextField label="תיאור" name="Description" value={recipe.Description} onChange={handleChange} fullWidth multiline rows={3} error={!!errors.general} helperText={errors.general} />
          <TextField label="רמת קושי" name="Difficulty" type="number" value={recipe.Difficulty} onChange={handleChange} fullWidth error={!!errors.general} helperText={errors.general} />
          <TextField label="משך זמן הכנה (דקות)" name="Duration" type="number" value={recipe.Duration} onChange={handleChange} fullWidth error={!!errors.general} helperText={errors.general} />
          <TextField select label="קטגוריה" name="Categoryid" value={recipe.Categoryid} onChange={handleChange} fullWidth error={!!errors.general} helperText={errors.general}>
            {categories.map((cat) => (
              <MenuItem key={cat.Id} value={cat.Id}>{cat.Name}</MenuItem>
            ))}
          </TextField>
          <TextField label="URL לתמונה" name="Img" value={recipe.Img} onChange={handleChange} fullWidth />
          
          {recipe.Ingridents.map((ing, index) => (
            <Box key={index}>
              <TextField label="שם מצרך" value={ing.Name} onChange={(e) => handleIngredientChange(index, "Name", e.target.value)} fullWidth error={!!errors[`ingredient${index}`]} helperText={errors[`ingredient${index}`]} />
              <TextField label="כמות" type="number" value={ing.Count} onChange={(e) => handleIngredientChange(index, "Count", e.target.value)} fullWidth error={!!errors[`ingredient${index}`]} helperText={errors[`ingredient${index}`]} />
              <TextField label="סוג" value={ing.Type} onChange={(e) => handleIngredientChange(index, "Type", e.target.value)} fullWidth error={!!errors[`ingredient${index}`]} helperText={errors[`ingredient${index}`]} />
            </Box>
          ))}
          <Button variant="contained" onClick={addIngredient}>הוסף מצרך</Button>
          
          <Button variant="contained" onClick={handleSave} fullWidth>שמור מתכון</Button>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>{snackbarMessage}</Alert>
          </Snackbar>
        </Paper>
      </Container>
    </Box>
  );
};

export default AddRecipe;

