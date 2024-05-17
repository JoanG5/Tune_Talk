import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../services/Spotify";
import { Typography } from "@mui/material";

function Home() {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user) {
      const request = axios.post("http://localhost:3000/user", user);
      request
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const spotifyQuery = async (searchTerm) => {
    const response = await spotifySearch(searchTerm);
    console.log(response);
  };

  return (
    <>
      <div className="text-3xl font-bold underline flex justify-center">
        Home
      </div>
      <div className="bg-gray-500 bg-cover w-screen h-screen">
        TESTETSTEST
        <div className="bg=black bg-cover background-black font-bold text-3x1">
          HELLO WORLD TESTING
        </div>
        <div className="text-3xl font-bold flex justify-center">
          <Typography variant="h5" sx={{ width: "fit-content" }}>
            Welcome to TuneTalk
          </Typography>
        </div>
        <div className="flex justify-center">
          <Typography variant="h5" sx={{ width: "fit-content" }}>
            Where we talk about your favorite tunes
          </Typography>
        </div>
      </div>
    </>
  );
}

export default Home;
