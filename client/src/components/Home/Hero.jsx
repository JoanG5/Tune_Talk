import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Fade from "@mui/material/Fade";
import LoginButton from "../LoginButton/LoginButton";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Hero() {
  const [fadeIn, setFadeIn] = useState(false);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Fade in={fadeIn} timeout={1000}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          background: "linear-gradient(45deg, #8E24AA, #3949AB, #3F51B5)",
          textAlign: "center",
          padding: 3,
        }}
      >
        {!isAuthenticated ? (
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
              <span style={{ color: "white", fontWeight: "bold" }}>
                🎵 Welcome to TuneTalk 🎵
              </span>
            </Typography>
            <Typography variant="h5" component="p" gutterBottom></Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ mt: 10 }}
              gutterBottom
            >
              <span style={{ color: "white", fontWeight: "bold" }}>
                Login and Create Your Own Personlized AI Song Today
              </span>
            </Typography>
            <LoginButton text="Log in or Sign up to get started!" />
          </Container>
        ) : (
          <Container maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
              <span style={{ color: "white", fontWeight: "bold" }}>
                🎵 Welcome to TuneTalk 🎵
              </span>
            </Typography>
            <Typography variant="h5" component="p" gutterBottom></Typography>
            <Typography
              variant="h2"
              component="h1"
              sx={{ mt: 10 }}
              gutterBottom
            >
              <span style={{ color: "white", fontWeight: "bold" }}>
                Create Your Own Personlized AI Song Today
              </span>
            </Typography>
            <Link to="/profile/ai">
              <Button
                color="inherit"
                size="large"
                variant="contained"
                sx={{ marginLeft: 2 }}
              >
                Get Started
              </Button>
            </Link>
          </Container>
        )}
      </Box>
    </Fade>
  );
}

export default Hero;
