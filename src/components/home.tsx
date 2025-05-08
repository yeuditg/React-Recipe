<<<<<<< HEAD
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { Button, Container, Typography } from '@mui/material';
// import React from "react";
// import Login from './Login'; // אל תשכח לייבא את הקומפוננטה
// import ShowRecipes from "./recipes/showRecipes";
// import LogUp from "./LogUp";

// const Home = () => {
//     const nav = useNavigate();
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [showLoginForm, setShowLoginForm] = useState(false); // State for showing login form
//     const [showLogUpForm, setShowLogUpForm] = useState(false); // State for showing logup form

//     const handleLoginSuccess = (success: boolean) => {
//         setLoginSuccess(success);
//         if (success) {
//             nav("/showRecipes"); // נווט לדף המתכונים לאחר התחברות מוצלחת
//         }
//     }

//     return (
//          <Container>
//             <Typography color='green' variant="h4" align="center" gutterBottom>
//                 ברוכים הבאים למתכונים שלנו
//             </Typography>
//             {!loginSuccess ? (
//                 <div className="button-container">
//                     <Button variant="contained" onClick={() => { setShowLoginForm(true); setShowLogUpForm(false); }}>
//                         התחבר
//                     </Button>
//                     <Button variant="contained" onClick={() => { setShowLogUpForm(true); setShowLoginForm(false); }}>
//                         הירשם
//                     </Button>
//                     {showLoginForm && <Login LoginSuccess={setLoginSuccess} />}
//                     {showLogUpForm && <LogUp LoginSuccess={setLoginSuccess} />}

//                 </div>
//             ) : <ShowRecipes />
//             }
//          </Container>

//     );
// }

// export default Home;
"use client"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Button, Container, Typography, Box, Paper, Fade, Grow } from "@mui/material"
import { styled } from "@mui/material/styles"
import { CakeIcon, UtensilsCrossedIcon, ChefHatIcon } from "lucide-react"
import Login from "./Login"
import ShowRecipes from "./recipes/showRecipes"
import LogUp from "./LogUp"

// Custom styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: "#FFF0F5",
  minHeight: "100vh",
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "2rem",
  position: "relative",
  overflow: "hidden",
}))

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "2.5rem",
  borderRadius: "16px",
  backgroundColor: "#FAE3D9",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  width: "100%",
  maxWidth: "600px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "6px",
    background: "linear-gradient(90deg, #FFB6B9 0%, #BBDED6 100%)",
  },
}))

const StyledButton = styled(Button)(({ theme, color }) => ({
  borderRadius: "30px",
  padding: "10px 24px",
  fontSize: "1rem",
  fontWeight: "bold",
  textTransform: "none",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease",
  backgroundColor: color === "primary" ? "#FFB6B9" : "#BBDED6",
  color: "#3D3D3D",
  "&:hover": {
    backgroundColor: color === "primary" ? "#ffa0a4" : "#a5d6cc",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
  },
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "1.5rem",
  marginBottom: "1.5rem",
  color: "#FFB6B9",
}))

const DecorativeCircle = styled(Box)(({ theme, position, size, color }) => ({
  position: "absolute",
  width: size,
  height: size,
  borderRadius: "50%",
  backgroundColor: color,
  opacity: 0.15,
  ...position,
  zIndex: 0,
}))

const Home = () => {
  const nav = useNavigate()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showLogUpForm, setShowLogUpForm] = useState(false)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(true)
  }, [])

  const handleLoginSuccess = (success: boolean) => {
    setLoginSuccess(success)
    if (success) {
      nav("/showRecipes")
    }
  }

  return (
    <StyledContainer>
      {/* Decorative elements */}
      <DecorativeCircle position={{ top: "-100px", right: "-100px" }} size="300px" color="#FFB6B9" />
      <DecorativeCircle position={{ bottom: "-50px", left: "-80px" }} size="200px" color="#BBDED6" />

      <Grow in={fadeIn} timeout={800}>
        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <IconWrapper>
            <ChefHatIcon size={36} />
            <UtensilsCrossedIcon size={36} />
            <CakeIcon size={36} />
          </IconWrapper>
          <Typography
            variant="h3"
            sx={{
              color: "#3D3D3D",
              fontWeight: "bold",
              marginBottom: "1rem",
              textAlign: "center",
              direction: "rtl",
            }}
          >
            ברוכים הבאים למתכונים שלנו
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#3D3D3D",
              opacity: 0.8,
              marginBottom: "2rem",
              maxWidth: "600px",
              textAlign: "center",
              direction: "rtl",
            }}
          >
            גלו מתכונים מדהימים, שתפו את היצירות שלכם והתחברו עם קהילת הבישול שלנו
          </Typography>
        </Box>
      </Grow>

      {!loginSuccess ? (
        <Fade in={fadeIn} timeout={1200}>
          <StyledPaper elevation={3}>
            <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#3D3D3D",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  direction: "rtl",
                }}
              >
                התחברו כדי להתחיל
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#3D3D3D",
                  opacity: 0.7,
                  direction: "rtl",
                }}
              >
                התחברו או הירשמו כדי לגלות את כל המתכונים המדהימים שלנו
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <StyledButton
                color="primary"
                onClick={() => {
                  setShowLoginForm(true)
                  setShowLogUpForm(false)
                }}
              >
                התחברות
              </StyledButton>
              <StyledButton
                color="secondary"
                onClick={() => {
                  setShowLogUpForm(true)
                  setShowLoginForm(false)
                }}
              >
                הרשמה
              </StyledButton>
            </Box>

            <Fade in={showLoginForm || showLogUpForm} timeout={500}>
              <Box>
                {showLoginForm && <Login LoginSuccess={setLoginSuccess} />}
                {showLogUpForm && <LogUp LoginSuccess={setLoginSuccess} />}
              </Box>
            </Fade>
          </StyledPaper>
        </Fade>
      ) : (
        <Fade in={loginSuccess} timeout={800}>
          <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
            <ShowRecipes />
          </Box>
        </Fade>
      )}
    </StyledContainer>
  )
}

export default Home
// "use client"

// import { useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"
// import { Button, Typography, Box, Paper, Fade, Grow } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import { CakeIcon, UtensilsCrossedIcon, ChefHatIcon } from "lucide-react"
// import Login from "./Login"
// import ShowRecipes from "./recipes/showRecipes"
// import LogUp from "./LogUp"
// import Layout from "./components/layout"

// // Custom styled components
// const HeroContainer = styled(Box)(() => ({
//   backgroundImage: `linear-gradient(rgba(255, 240, 245, 0.85), rgba(255, 240, 245, 0.85)), url('/cookiess.png')`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
//   backgroundRepeat: "no-repeat",
//   minHeight: "calc(100vh - 64px - 80px)", // Subtract header and footer height
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   padding: "3rem 1rem",
//   position: "relative",
// }))

// const StyledPaper = styled(Paper)(() => ({
//   padding: "2.5rem",
//   borderRadius: "16px",
//   backgroundColor: "#FAE3D9",
//   boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
//   width: "100%",
//   maxWidth: "600px",
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "6px",
//     background: "linear-gradient(90deg, #FFB6B9 0%, #BBDED6 100%)",
//   },
// }))

// const StyledButton = styled(Button)(({ theme, color }) => ({
//   borderRadius: "30px",
//   padding: "10px 24px",
//   fontSize: "1rem",
//   fontWeight: "bold",
//   textTransform: "none",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   transition: "all 0.3s ease",
//   backgroundColor: color === "primary" ? "#FFB6B9" : "#BBDED6",
//   color: "#3D3D3D",
//   "&:hover": {
//     backgroundColor: color === "primary" ? "#ffa0a4" : "#a5d6cc",
//     transform: "translateY(-2px)",
//     boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
//   },
// }))

// const IconWrapper = styled(Box)(() => ({
//   display: "flex",
//   justifyContent: "center",
//   gap: "1.5rem",
//   marginBottom: "1.5rem",
//   color: "#FFB6B9",
// }))

// const Home = () => {
//   const nav = useNavigate()
//   const [loginSuccess, setLoginSuccess] = useState(false)
//   const [showLoginForm, setShowLoginForm] = useState(false)
//   const [showLogUpForm, setShowLogUpForm] = useState(false)
//   const [fadeIn, setFadeIn] = useState(false)

//   useEffect(() => {
//     setFadeIn(true)
//   }, [])

//   const handleLoginSuccess = (success: boolean) => {
//     setLoginSuccess(success)
//     if (success) {
//       nav("/showRecipes")
//     }
//   }

//   return (
//     <Layout>
//       <HeroContainer>
//         <Grow in={fadeIn} timeout={800}>
//           <Box sx={{ textAlign: "center", position: "relative", zIndex: 1, mb: 4 }}>
//             <IconWrapper>
//               <ChefHatIcon size={36} />
//               <UtensilsCrossedIcon size={36} />
//               <CakeIcon size={36} />
//             </IconWrapper>
//             <Typography
//               variant="h3"
//               sx={{
//                 color: "#3D3D3D",
//                 fontWeight: "bold",
//                 marginBottom: "1rem",
//                 textAlign: "center",
//                 direction: "rtl",
//               }}
//             >
//               ברוכים הבאים למתכונים שלנו
//             </Typography>
//             <Typography
//               variant="subtitle1"
//               sx={{
//                 color: "#3D3D3D",
//                 opacity: 0.8,
//                 marginBottom: "2rem",
//                 maxWidth: "600px",
//                 textAlign: "center",
//                 direction: "rtl",
//               }}
//             >
//               גלו מתכונים מדהימים, שתפו את היצירות שלכם והתחברו עם קהילת הבישול שלנו
//             </Typography>
//           </Box>
//         </Grow>

//         {!loginSuccess ? (
//           <Fade in={fadeIn} timeout={1200}>
//             <StyledPaper elevation={3}>
//               <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: "#3D3D3D",
//                     fontWeight: "bold",
//                     marginBottom: "0.5rem",
//                     direction: "rtl",
//                   }}
//                 >
//                   התחברו כדי להתחיל
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: "#3D3D3D",
//                     opacity: 0.7,
//                     direction: "rtl",
//                   }}
//                 >
//                   התחברו או הירשמו כדי לגלות את כל המתכונים המדהימים שלנו
//                 </Typography>
//               </Box>

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   gap: "1rem",
//                   marginBottom: "2rem",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <StyledButton
//                   color="primary"
//                   onClick={() => {
//                     setShowLoginForm(true)
//                     setShowLogUpForm(false)
//                   }}
//                 >
//                   התחברות
//                 </StyledButton>
//                 <StyledButton
//                   color="secondary"
//                   onClick={() => {
//                     setShowLogUpForm(true)
//                     setShowLoginForm(false)
//                   }}
//                 >
//                   הרשמה
//                 </StyledButton>
//               </Box>

//               <Fade in={showLoginForm || showLogUpForm} timeout={500}>
//                 <Box>
//                   {showLoginForm && <Login LoginSuccess={setLoginSuccess} />}
//                   {showLogUpForm && <LogUp LoginSuccess={setLoginSuccess} />}
//                 </Box>
//               </Fade>
//             </StyledPaper>
//           </Fade>
//         ) : (
//           <Fade in={loginSuccess} timeout={800}>
//             <Box sx={{ width: "100%", position: "relative", zIndex: 1 }}>
//               <ShowRecipes />
//             </Box>
//           </Fade>
//         )}
//       </HeroContainer>
//     </Layout>
//   )
// }

// export default Home
=======
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
>>>>>>> 0e4152768b3e371ad10c5b7380423d6246620152
