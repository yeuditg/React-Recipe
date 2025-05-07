import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';

// הגדרת הסכימה לאימות
const schema = yup.object().shape({
    UserName: yup.string().required("יש להזין שם משתמש"),
    Password: yup.string().min(8, "סיסמה חייבת להכיל לפחות 8 תווים").required("יש להזין סיסמה"),
});

// הגדרת סוגי הנתונים של הטופס
type FormData = yup.InferType<typeof schema>;

const Login = ({ LoginSuccess }: { LoginSuccess: Function}) => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        try {
            const res = await axios.post<any>("http://localhost:8080/api/user/login", data);
            console.log(res.data); 
            LoginSuccess(true);
            navigate("showRecipes")
        } catch (e) {
            console.error(e);
            // טיפול בשגיאות נוספות אם יש צורך
        }
    };

    return (
        <Box 
            sx={{ 
                width: '300px', // קבע את הרוחב של המסגרת
                padding: '20px', // הוסף ריפוד פנימי
                border: '1px solid #ccc', // גבול מסגרת
                borderRadius: '8px', // עגלת פינות
                boxShadow: 2, // הוסף צל
                margin: 'auto', // מרכז את המסגרת
                marginTop: '100px' // הוסף רווח מלמעלה
            }}>
            <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" align="center">התחברות</Typography>
               
                <TextField 
                    {...register("UserName")} 
                    label="שם משתמש" 
                    fullWidth 
                    margin="normal" 
                    error={!!errors.UserName} 
                    helperText={errors.UserName?.message} 
                />

                <TextField 
                    type="password" 
                    {...register("Password")} 
                    label="סיסמה" 
                    fullWidth 
                    margin="normal" 
                    error={!!errors.Password} 
                    helperText={errors.Password?.message} 
                />

                <Button type="submit" variant="contained" color="primary" disabled={!isValid} fullWidth>
                    התחבר
                </Button>

                {errors.UserName?.message === "user not found!" && (
                    <>
                    <Link to="/LogUp">להרשמה הקליקו כאן👇</Link>
                    </>
                )}
            </form>
        </Box>
    );
}

export default Login;
