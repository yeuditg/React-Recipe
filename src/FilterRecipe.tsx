import { Box, Button, MenuItem, Popover, TextField, Typography } from "@mui/material";

interface FilterProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  filterCategory: string;
  setFilterCategory: (value: string) => void;
  filterDuration: number | "";
  setFilterDuration: (value: number | "") => void;
  filterDifficulty: string;
  setFilterDifficulty: (value: string) => void;
  filterUserId: number | "";
  setFilterUserId: (value: number | "") => void;
  categories: { Id: number; Name: string }[];
  myUser: any; // ניתן להחליף את Any בטיפוס המתאים
}

const FilterRecipe: React.FC<FilterProps> = ({
  open,
  anchorEl,
  handleClose,
  filterCategory,
  setFilterCategory,
  filterDuration,
  setFilterDuration,
  filterDifficulty,
  setFilterDifficulty,
  filterUserId,
  setFilterUserId,
  categories,
  myUser,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          p: 3,
          width: 300,
          borderRadius: 3,
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        סינון מתכונים
      </Typography>
      <Box component="form" sx={{ "& .MuiTextField-root": { mb: 2 } }}>
        <TextField
          select
          label="קטגוריה"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">קטגוריות</MenuItem>
          {categories.length > 0 ? (
            categories.map((category) => (
              <MenuItem key={category.Id} value={category.Id}>
                {category.Name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>אין קטגוריות זמינות</MenuItem>
          )}
        </TextField>
        <TextField
          type="number"
          label="זמן הכנה מקסימלי (דקות)"
          value={filterDuration}
          onChange={(e) => setFilterDuration(e.target.value ? Number(e.target.value) : "")}
          fullWidth
          variant="outlined"
          inputProps={{ min: 0 }} // הוספת מגבלה לערך מינימלי
        />
        <TextField
          select
          label="רמת קושי"
          value={filterDifficulty}
          onChange={(e) => setFilterDifficulty(e.target.value)}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">כל הרמות</MenuItem>
          <MenuItem value="1">קל</MenuItem>
          <MenuItem value="2">בינוני</MenuItem>
          <MenuItem value="3">קשה</MenuItem>
        </TextField>
        <TextField
          type="number"
          label="נוצר על ידי (מזהה משתמש)"
          value={filterUserId}
          onChange={(e) => setFilterUserId(e.target.value ? Number(e.target.value) : "")}
          fullWidth
          variant="outlined"
          inputProps={{ min: 0 }} // הוספת מגבלה לערך מינימלי
        />
        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
          החל סינון
        </Button>
      </Box>
    </Popover>
  );
};

export default FilterRecipe;
