import { React, useState } from "react";
import { AppBar, Toolbar, Box, Typography, Tab, Tabs } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/songs");
        break;
      case 1:
        navigate("/albums");
        break;
      case 2:
        navigate("/profile");
        break;
      default:
        break;
    }
  };

  return (
    <Box classname="top-0">
      <AppBar position="" sx={{ background: "black" }}>
        <Toolbar>
          <Box flexGrow={1}>
            <Box display={"flex"} alignItems={"center"} gap={0.5}>
              <img width={"54px"} height={"54px"} src={""} alt="logo"></img>
              <Typography variant="h5" sx={{ width: "fit-content" }}>
                TuneTalk
              </Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="navigation tabs"
              >
                <Tab label="Home" />
                <Link to="/Home">
                  <Tab label="Home" />
                </Link>
                <Link to="/profile">
                  <Tab label="Profile" />
                </Link>
                <Link to="/profile/savedsong">
                  <Tab label="Saved Songs" />
                </Link>
                <Link to="/profile/savedalbum">
                  <Tab label="Saved Albums" />
                </Link>
                <Tab label="Songs" />
                <Tab label="Profile" />
              </Tabs>
              {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
