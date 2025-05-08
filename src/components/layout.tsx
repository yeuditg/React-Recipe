// "use client"

// import type { ReactNode } from "react"
// import { Box, Container, AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import { useNavigate, useLocation } from "react-router-dom"
// import { HomeIcon, CakeIcon, LogInIcon, UserPlusIcon } from "lucide-react"

// interface LayoutProps {
//   children: ReactNode
// }

// const StyledAppBar = styled(AppBar)(() => ({
//   backgroundColor: "#FAE3D9",
//   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
//   color: "#3D3D3D",
// }))

// const StyledButton = styled(Button)(({ theme, color }) => ({
//   borderRadius: "30px",
//   padding: "8px 16px",
//   fontSize: "0.9rem",
//   fontWeight: "bold",
//   textTransform: "none",
//   margin: "0 8px",
//   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
//   transition: "all 0.3s ease",
//   backgroundColor: color === "primary" ? "#FFB6B9" : "#BBDED6",
//   color: "#3D3D3D",
//   "&:hover": {
//     backgroundColor: color === "primary" ? "#ffa0a4" : "#a5d6cc",
//     transform: "translateY(-2px)",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//   },
// }))

// const Footer = styled(Box)(() => ({
//   backgroundColor: "#FAE3D9",
//   padding: "1.5rem 0",
//   marginTop: "auto",
//   textAlign: "center",
//   boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.05)",
//   color: "#3D3D3D",
// }))

// const Layout = ({ children }: LayoutProps) => {
//   const navigate = useNavigate()
//   const location = useLocation()

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         backgroundColor: "#FFF0F5",
//       }}
//     >
//       <StyledAppBar position="static">
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate("/")} sx={{ mr: 1 }}>
//               <CakeIcon size={24} />
//             </IconButton>
//             <Typography
//               variant="h6"
//               component="div"
//               sx={{ fontWeight: "bold", display: { xs: "none", sm: "block" }, direction: "rtl" }}
//             >
//               מתכונים שלנו
//             </Typography>
//           </Box>

//           <Box sx={{ display: "flex", gap: 1 }}>
//             <StyledButton color="primary" startIcon={<HomeIcon size={18} />} onClick={() => navigate("/")}>
//               דף הבית
//             </StyledButton>

//             {location.pathname !== "/" && (
//               <>
//                 <StyledButton color="secondary" startIcon={<LogInIcon size={18} />} onClick={() => navigate("/")}>
//                   התחברות
//                 </StyledButton>
//                 <StyledButton color="secondary" startIcon={<UserPlusIcon size={18} />} onClick={() => navigate("/")}>
//                   הרשמה
//                 </StyledButton>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </StyledAppBar>

//       <Box component="main" sx={{ flexGrow: 1 }}>
//         {children}
//       </Box>

//       <Footer>
//         <Container>
//           <Typography variant="body2" sx={{ mb: 1 }}>
//             © {new Date().getFullYear()} מתכונים שלנו. כל הזכויות שמורות.
//           </Typography>
//           <Typography variant="caption" sx={{ opacity: 0.7 }}>
//             האתר הטוב ביותר למתכונים טעימים ומשפחתיים
//           </Typography>
//         </Container>
//       </Footer>
//     </Box>
//   )
// }

// export default Layout
