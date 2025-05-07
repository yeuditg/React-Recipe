import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Button, Container, Typography } from '@mui/material';
import React from "react";
import Login from './Login'; // אל תשכח לייבא את הקומפוננטה
import ShowRecipes from "./recipes/showRecipes";
import LogUp from "./LogUp";

const Home = () => {
    const nav = useNavigate();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(false); // State for showing login form
    const [showLogUpForm, setShowLogUpForm] = useState(false); // State for showing logup form

    const handleLoginSuccess = (success: boolean) => {
        setLoginSuccess(success);
        if (success) {
            nav("/showRecipes"); // נווט לדף המתכונים לאחר התחברות מוצלחת
        }
    }

    return (
         <Container>
            <Typography color='green' variant="h4" align="center" gutterBottom>
                ברוכים הבאים למתכונים שלנו
            </Typography>
            {!loginSuccess ? (
                <div className="button-container">
                    <Button variant="contained" onClick={() => { setShowLoginForm(true); setShowLogUpForm(false); }}>
                        התחבר
                    </Button>
                    <Button variant="contained" onClick={() => { setShowLogUpForm(true); setShowLoginForm(false); }}>
                        הירשם
                    </Button>
                    {showLoginForm && <Login LoginSuccess={setLoginSuccess} />}
                    {showLogUpForm && <LogUp LoginSuccess={setLoginSuccess} />}

                </div>
            ) : <ShowRecipes />
            }
         </Container>

    );
}

export default Home;
