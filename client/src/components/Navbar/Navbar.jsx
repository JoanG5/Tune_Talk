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
import Navigation from "./Navigation";
import { logoImg } from "../../assets";
import Searchbar from "../SearchBar/SearchBar";

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
    navigate(`/profile/${user.sub}`);
    handleClose();
  };

  const handleLogout = () => {
    handleClose();
    logout({ returnTo: window.location.origin });
  };

  const handleHome = () => {
    navigate("/");
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
          <Box
            display="flex"
            alignItems="center"
            onClick={handleHome}
            sx={{ cursor: "pointer" }}
          >
            <img width={"54px"} height={"54px"} src={logoImg} alt="logo" />
            <Typography
              variant="h5"
              sx={{ width: "fit-content", color: "white", marginLeft: 1 }}
            >
              TuneTalk
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              margin: 4,
              height: "40px",
              wkdtn: "fit-content",
            }}
          >
            <Searchbar />
          </Box>
          {(isAuthenticated && (
            <Navigation
              value={value}
              handleChange={handleChange}
              userId={user.sub}
            />
          )) || (
            <Navigation value={value} handleChange={handleChange} userId={""} />
          )}
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
                <Box sx={{ marginLeft: 2 }}>
                  <IconButton onClick={handleMenu}>
                    <Avatar src={user.picture} alt={user.name} />
                  </IconButton>
                </Box>
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
              <LoginButton text="Login" />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
