import React, { useEffect, useState } from "react";
import SpotifyService from "../services/Spotify";

function Home() {
  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${
        import.meta.env.SPOTIFY_CLIENT_ID
      }&client_secret=${import.meta.env.SPOTIFY_CLIENT_SECRET}`,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParameters)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error fetching access token:", error));
  }, []);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
