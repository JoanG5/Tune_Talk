import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import Fade from "@mui/material/Fade";

function Hero() {
  const [fadeIn, setFadeIn] = useState(false);

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
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            <span style={{ color: "white", fontWeight: "bold" }}>
              Welcome to TuneTalk
            </span>
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            The place where you can review, save, and share your favorite tunes
          </Typography>
        </Container>
      </Box>
    </Fade>
  );
}

export default Hero;
