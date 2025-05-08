import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import '../styles/LogUp.css';

// הגדרת סוגים עבור המשתמש
interface User {
    UserName: string; 
    Password: string; 
    Name?: string;
    Phone?: string;
    Email?: string;
    Tz?: string;
}

const LogUp = ({ LoginSuccess }: { LoginSuccess: Function}) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<User>();
    const [isLogin, setIsLogin] = useState<string | null>(null); // מצב הכניסה

    const onSent = async (data: User) => {
                setLoading(true);
                console.log("Sending data:", data);
                try {
                    const res = await axios.post<User>("http://localhost:8080/api/user/sighin", data, {
                        headers: { "Content-Type": "application/json" },
                    });
                    setIsLogin("נרשמת בהצלחה");
                    LoginSuccess(true); 
                } catch (error: any) {
                    console.error("Error response:", error.response); 
                    if (error.response?.data === "המשתמש כבר רשום במערכת") {
                        setError("UserName", { message: "המשתמש כבר רשום במערכת" });
                    } else if (error.response?.data === "האימייל כבר רשום במערכת") {
                        setError("Email", { message: "האימייל כבר רשום במערכת" });
                    } else if (error.response?.data === "לא מולאו כל הפרטים") {
                        setError("UserName", { message: "אנא מלא את כל השדות הנדרשים" });
                    } else {
                        setError("UserName", { message: error.response?.data ||"!נרשמת בהצלחה" });
                    }
                } finally {
                    setLoading(false); // תמיד להפסיק את מצב הטעינה
                }
            };
        

    return (
        <div className="header">
            <form className="LogUpForm" onSubmit={handleSubmit(onSent)}>
                <h2>הרשמה</h2>
                <input
                    type="text"
                    {...register("UserName", { required: true })} // שונה ל-UserName
                    placeholder="Username"
                />
                <p>{errors.UserName && <span style={{ color: 'red' }}>{errors.UserName.message}</span>}</p>

                <input
                    type="password"
                    {...register("Password", { required: true })} // שונה ל-Password
                    placeholder="Password"
                />
                <p>{errors.Password && <span style={{ color: 'red' }}>This field is required</span>}</p>

                <input {...register("Name", { required: true })} placeholder="Name" />
                <p>{errors.Name && <span style={{ color: 'red' }}>This field is required</span>}</p>

                <input {...register("Phone", {
                    required: true,
                    pattern: {
                        value: /^[0-9]+$/,
                        message: 'Phone must contain only numbers'
                    }
                })} placeholder="Phone" />
                <p>{errors.Phone && <span style={{ color: 'red' }}>{errors.Phone.message}</span>}</p>

                <input {...register("Email", {
                    required: true,
                    validate: value => value.includes('@') || 'Email must contain "@"'
                })} placeholder="Email" />
                <p>{errors.Email && <span style={{ color: 'red' }}>{errors.Email.message}</span>}</p>

                <input {...register("Tz", { required: true })} placeholder="ID Number" />
                <p>{errors.Tz && <span style={{ color: 'red' }}>This field is required</span>}</p>
            
                <button type="submit" disabled={loading}>{loading ? 'טוען...' : 'התחבר'}</button>
            </form>
            {isLogin && <p>{isLogin}</p>}
        </div>
    );
};

export default LogUp;

// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, TextField, Typography } from '@mui/material';
// import axios from 'axios';
// import { User } from './user';

// const LogUp = () => {
//     const { register, handleSubmit } = useForm();

//     const onSubmit = async (data) => {
//         try {
//             debugger;
//             await axios.post<User>("http://localhost:8080/api/user/sighin", data);
//             alert("נרשמת בהצלחה!");
//         } catch (error) {
//             console.error("Error signing up:", error);
//         }
//     };

//     return (
//         <div>
//             <Typography variant="h4" gutterBottom>
//                 הרשמה
//             </Typography>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <TextField {...register("UserName")} label="שם משתמש" required fullWidth margin="normal" />
//                 <TextField {...register("Password")} label="סיסמה" type="password" required fullWidth margin="normal" />
//                 <TextField {...register("Name")} label="שם" required fullWidth margin="normal" />
//                 <TextField {...register("Phone")} label="טלפון" required fullWidth margin="normal" />
//                 <TextField {...register("Email")} label="אימייל" required fullWidth margin="normal" />
//                 <TextField {...register("Tz")} label="מספר זהות" required fullWidth margin="normal" />
//                 <Button type="submit" variant="contained" color="primary">הרשמה</Button>
//             </form>
//         </div>
//     );
// };

// export default LogUp;
