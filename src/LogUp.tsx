import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface User {
    UserName: string; 
    Password: string; 
    Name?: string;
    Phone?: string;
    Email?: string;
    Tz?: string;
}

const LogUp = ({ LoginSuccess }: { LoginSuccess: Function}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<User>();
    const [isLogin, setIsLogin] = useState<string | null>(null); // מצב הכניסה

    const onSent = async (data: User) => {
        setLoading(true);
        console.log("Sending data:", data);
        try {
            const res = await axios.post("http://localhost:8080/api/user/sighin", data, {
                headers: { "Content-Type": "application/json" },
            });
            sessionStorage.setItem("userId", res.data.Id); 
            setIsLogin("נרשמת בהצלחה");
            LoginSuccess(true); 
            navigate("/ShowRecipes");
        } catch (error: any) {
            console.error("Error response:", error.response); 
            if (error.response?.data === "המשתמש כבר רשום במערכת") {
                setError("UserName", { message: "המשתמש כבר רשום במערכת" });
            } else if (error.response?.data === "האימייל כבר רשום במערכת") {
                setError("Email", { message: "האימייל כבר רשום במערכת" });
            } else if (error.response?.data === "לא מולאו כל הפרטים") {
                setError("UserName", { message: "אנא מלא את כל השדות הנדרשים" });
            } else {
                setError("UserName", { message: error.response?.data || "!נרשמת בהצלחה" });
            }
        } finally {
            setLoading(false); 
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