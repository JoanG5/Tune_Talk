import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from "./Navigation";
import { Avatar } from "@mui/material";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(navigationItems[newValue].route);
  };

  return (
    <Box className="top-0">
      <AppBar position="fixed" sx={{ background: "black", height: "70px" }}>
        <Toolbar sx={{ minHeight: "80px", alignItems: "center" }}>
          <Box flexGrow={1}>
            <Box display={"flex"} alignItems={"center"} gap={0.5}>
              <img width={"54px"} height={"54px"} src={""} alt="logo" />
              <Typography
                variant="h5"
                sx={{ width: "fit-content", color: "white" }}
              >
                TuneTalk
              </Typography>
              <Navigation value={value} handleChange={handleChange} />
              <Box
                sx={{
                  marginLeft: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {isAuthenticated ? (
                  <>
                    <Avatar src={user.picture} alt={user.name} />
                    <LogoutButton />
                  </>
                ) : (
                  <LoginButton />
                )}
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
