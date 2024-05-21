import React from "react";
import { Box, Typography, Link, Container, Grid } from "@mui/material";

function Footer() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "20vh",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Link
                href="https://github.com"
                color="textSecondary"
                variant="subtitle1"
              >
                GitHub
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Typography color="textSecondary" variant="subtitle1">
                &copy; {new Date().getFullYear()} TuneTalk
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Existing code */}
    </>
  );
}

export default Footer;
