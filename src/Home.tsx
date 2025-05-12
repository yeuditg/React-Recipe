import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Button, Container, Typography, Snackbar } from '@mui/material';
import React from "react";
import Login from './Login';
import ShowRecipes from "./ShowRecipes";
import LogUp from "./LogUp";

const Home = () => {
const nav = useNavigate();
const [loginSuccess, setLoginSuccess] = useState(false);
const [showLoginForm, setShowLoginForm] = useState(false);
const [showLogUpForm, setShowLogUpForm] = useState(false);
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');

const handleLoginSuccess = (success: boolean) => {
    setLoginSuccess(success);
    if (success) {
        nav("/showRecipes");
        setSnackbarMessage('התחברות מוצלחת!');
        setSnackbarOpen(true);
    }
};

const handleSnackbarClose = () => {
    setSnackbarOpen(false);
};

return (
    <Container>
        <Typography color='green' variant="h4" align="center" gutterBottom>
            ברוכים הבאים למתכונים שלנו
        </Typography>
        {!loginSuccess ? (
            <div className="button-container">
                <Button 
                    variant="contained" 
                    onClick={() => { 
                        setShowLoginForm(true); 
                        setShowLogUpForm(false); 
                    }}
                >
                    התחבר
                </Button>
                <Button 
                    variant="contained" 
                    onClick={() => { 
                        setShowLogUpForm(true); 
                        setShowLoginForm(false); 
                    }}
                >
                    הירשם
                </Button>
                {showLoginForm && <Login LoginSuccess={handleLoginSuccess} />}
                {showLogUpForm && <LogUp LoginSuccess={handleLoginSuccess} />}
            </div>
        ) : <ShowRecipes />}
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
        />
       <Outlet /> 
    </Container>
);
}

export default Home;
