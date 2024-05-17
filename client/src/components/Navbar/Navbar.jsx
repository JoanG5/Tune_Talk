import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import Searchbar from "../Searchbar/Searchbar"
import Navigation from "./Navigation";

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(navigationItems[newValue].to);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    logout({ returnTo: window.location.origin });
  };

  return (
    <Box className="top-0">
      <AppBar position="relative" sx={{ background: "black", height: "70px" }}>
        <Toolbar
          sx={{
            minHeight: "70px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box display="flex" alignItems="center">
            <img
              width={"54px"}
              height={"54px"}
              src={"path/to/logo.png"}
              alt="logo"
            />
            <Typography
              variant="h5"
              sx={{ width: "fit-content", color: "white", marginLeft: 1 }}
            >
              TuneTalk
            </Typography>
            <Box 
              sx={{
                display: "flex",
                margin: 4,
                height: "40px",
                wkdtn: "fit-content",
              }}
            >
              <Searchbar/>
            </Box>
          </Box>
          <Navigation value={value} handleChange={handleChange} />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              marginRight: 3,
            }}
          >
            {isAuthenticated ? (
              <>
                <IconButton onClick={handleMenu} sx={{ paddingLeft: 2 }}>
                  <Avatar src={user.picture} alt={user.name} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <LoginButton />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
