// src/components/Navigation/Navigation.jsx
import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const navigationItems = [
  { text: "Home", to: "/" },
  { text: "Saved Songs", to: "/profile/savedsong" },
  { text: "Saved Albums", to: "/profile/savedalbum" },
  { text: "Songs", to: "/song/:songId" },
  { text: "Albums", to: "/album/:albumId" },
];

const Navigation = ({ value, handleChange }) => {
  return (
    <Box display="flex" justifyContent="flex-end" flexGrow={1} gap={2}>
      {navigationItems.map(({ to, text }) => (
        <Link key={to} to={to} style={{ textDecoration: "none" }}>
          <Button color="inherit" size="large" sx={{ textDecoration: "none" }}>
            {text}
          </Button>
        </Link>
      ))}
    </Box>
  );
};

export default Navigation;
