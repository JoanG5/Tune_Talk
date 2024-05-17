import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../../services/Spotify";
import axios from 'axios';

export const Searchbar = () => {
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

return(
    <>
      <input
        type="text"
        placeholder=" Search for a song or album"
        className="text-black rounded outline-none border-2"
        onChange={(e) => spotifyQuery(e.target.value)}
      />
    </>
  );
}

export default Searchbar;