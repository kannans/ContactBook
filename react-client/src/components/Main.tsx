import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box, Stack, createTheme, ThemeProvider } from "@mui/material";
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import PersistLogin from "./sessions/PersistLogin"
import Login from "./sessions/Login";
import AcceptInvite from "./sessions/AcceptInvite";
import Signup from "./sessions/Signup";
import PrivateRoute from './routes/PrivateRoute';
import PublicOnlyRoute from './routes/PublicOnlyRoute';
import Users from './members/Users';


const Main = ()=> {
  const darkTheme = createTheme({
    palette: {
      mode: "light"
    },
  });

  return (
        <Router>
            <Routes>
              {/* After Login */}
              <Route element={<PersistLogin />}>
                <Route path="/" element={
                  <PrivateRoute>
                    <ThemeProvider theme={darkTheme}>
                    <Navbar/>
                      <Box bgcolor={"background.default"} color={"text.primary"}>
                        <Stack direction="row" spacing={2} justifyContent="space-evenly">
                          <Sidebar/>
                          <Users/>
                        </Stack>
                      </Box>
                    </ThemeProvider>
                  </PrivateRoute>
                } />
              </Route>
              {/* Without Login */}
              <Route path="/login" element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute> 
                }/>
              <Route path="/signup" element={
                <PublicOnlyRoute>
                  <Signup />
                </PublicOnlyRoute> 
              }/>

              <Route path="/accept/:invitation_token" element={
                <PublicOnlyRoute>
                  <AcceptInvite />
                </PublicOnlyRoute> 
              }/>
            </Routes>
        </Router>
     
  )
}

export default Main;