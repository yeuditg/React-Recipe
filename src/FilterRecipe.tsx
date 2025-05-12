import React from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';

const RecipeFilter = ({ filterDifficulty, setFilterDifficulty, filterUserId, setFilterUserId }) => {
    const difficulties = [
        { value: '1', label: 'קל' },
        { value: '2', label: 'בינוני' },
        { value: '3', label: 'קשה' }
    ];

    const handleDifficultyChange = (event:any) => {
        setFilterDifficulty(event.target.value);
    };

    const handleUserIdChange = (event:any) => {
        const value = event.target.value;
        setFilterUserId(value ? Number(value) : null);
    };

    return (
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
            <Grid item xs={12} sm={6}>
                <TextField
                    select
                    label="בחר רמת קושי"
                    value={filterDifficulty || ''} 
                    onChange={handleDifficultyChange}
                    fullWidth
                >
                    <MenuItem value="">כל הרמות</MenuItem>
                    {difficulties.map((difficulty) => (
                        <MenuItem key={difficulty.value} value={difficulty.value}>
                            {difficulty.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    type="number"
                    label="נוצר על ידי (User ID)"
                    value={filterUserId !== null ? filterUserId : ''} 
                    onChange={handleUserIdChange}
                    fullWidth
                />
            </Grid>
        </Grid>
    );
};

export default RecipeFilter;
