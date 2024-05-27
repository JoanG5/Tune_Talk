import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = ({ text }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      color="inherit"
      size="large"
      variant="contained"
      sx={{ marginLeft: 2 }}
      onClick={() => loginWithRedirect()}
    >
      {text}
    </Button>
  );
};

export default LoginButton;
