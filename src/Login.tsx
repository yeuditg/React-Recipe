import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface LoginData {
    UserName: string; 
    Password: string; 
}

const Login = ({ LoginSuccess }: { LoginSuccess: Function }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginData>();
    const [isLogin, setIsLogin] = useState<string | null>(null); // מצב הכניסה

    const onLogin = async (data: LoginData) => {
        setLoading(true);
        console.log("Sending login data:", data);
        try {
            const res = await axios.post<{ userId: string }>("http://localhost:8080/api/user/login", data, {
                headers: { "Content-Type": "application/json" },
            });
            sessionStorage.setItem("userId", res.data.Id);
            console.log(res);
            
            setIsLogin("התחברת בהצלחה");
            LoginSuccess(true);
        } catch (error: any) {
            console.error("Error response:", error.response);
            if (error.response?.data === "שם המשתמש או הסיסמה שגויים") {
                setError("UserName", { message: "שם המשתמש או הסיסמה שגויים" });
            } else {
                setError("UserName", { message: error.response?.data || "שגיאה לא ידועה" });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="header">
            <form className="LoginForm" onSubmit={handleSubmit(onLogin)}>
                <h2>כניסה</h2>
                <input
                    type="text"
                    {...register("UserName", { required: true })}
                    placeholder="Username"
                />
                <p>{errors.UserName && <span style={{ color: 'red' }}>{errors.UserName.message}</span>}</p>

                <input
                    type="password"
                    {...register("Password", { required: true })}
                    placeholder="Password"
                />
                <p>{errors.Password && <span style={{ color: 'red' }}>This field is required</span>}</p>

                <button type="submit" disabled={loading}>{loading ? 'טוען...' : 'התחבר'}</button>
            </form>
            {isLogin && <p>{isLogin}</p>}
        </div>
    );
};

export default Login;
