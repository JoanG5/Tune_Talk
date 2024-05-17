import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../services/Spotify";

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
      <input
        type="text"
        placeholder="Search for a song"
        onChange={(e) => spotifyQuery(e.target.value)}
      />
      <div className="text-3xl font-bold underline">Home</div>
    </>
  );
}

export default Home;
