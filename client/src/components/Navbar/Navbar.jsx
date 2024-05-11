import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Box height={"100vh"}>
      <AppBar>
        <Toolbar>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
