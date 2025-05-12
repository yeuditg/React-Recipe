import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Container, Typography, Snackbar } from '@mui/material';
import React from "react";
import Login from './Login'; 
import ShowRecipes from "./ShowRecipes";
import LogUp from "./LogUp";

const Header = ({ isLoggedIn, onLogout }) => (
    <header style={{ backgroundColor: '#E0F7FA', padding: '10px' }}>
        <Typography variant="h6" align="center" style={{ color: '#00796B' }}>
            המתכונים שלנו
        </Typography>
        {isLoggedIn ? (
            <Button 
                variant="contained" 
                onClick={onLogout} 
                style={{ backgroundColor: '#00796B', color: '#FFFFFF' }}
            >
                התנתק
            </Button>
        ) : (
            <div>
                <Link to="/login">
                    <Button variant="contained" style={{ backgroundColor: '#0097A7', color: '#FFFFFF' }}>
                        התחבר
                    </Button>
                </Link>
                <Link to="/signup">
                    <Button variant="contained" style={{ backgroundColor: '#0097A7', color: '#FFFFFF' }}>
                        הרשמה
                    </Button>
                </Link>
            </div>
        )}
    </header>
);

const Footer = () => (
    <footer style={{ backgroundColor: '#E0F7FA', padding: '10px' }}>
        <Typography variant="body2" align="center" style={{ color: '#00796B' }}>
            © 2025 כל הזכויות שמורות
        </Typography>
    </footer>
);

export default Header;
