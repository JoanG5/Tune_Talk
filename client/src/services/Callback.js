import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import spotifyAuthService from "../services/spotifyAuthService";

const Callback = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const { access_token } = await spotifyAuthService.getTokenFromCode(code);
      spotifyAuthService.setAccessToken(access_token);
      history.push("/");
    };

    fetchData();
  }, [history, location.search]);

  return <div>Redirecting...</div>;
};

export default Callback;
