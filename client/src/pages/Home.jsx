import React, { useEffect, useState } from "react";
import axios from "axios";
import SpotifyService from "../services/Spotify";

function Home() {
  const [search, setSearch] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${process.env.SPOTIFY_CLIENT_ID}&client_secret=${process.env.SPOTIFY_CLIENT_SECRET}`,
    };

    fetch(`https://accounts.spotify.com/api/token`, authParameters)
      .then((response) => response.json())
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => console.error("Error fetching access token:", error));
  }, []);

  const artistSearch = () => {
    console.log(`Searching for ${search}`);

    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const request = axios.get(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      searchParameters
    );
    request
      .then((response) => {
        const request = axios.get(
          `https://api.spotify.com/v1/artists/${response.data.artists.items[0].id}/albums`,
          searchParameters
        );
        request
          .then((response) => {
            setAlbums(response.data.items);
          })
          .catch((error) => {
            console.error("Error fetching albums:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching artist:", error);
      });
  };

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)}></input>
      <button onClick={artistSearch}>SEARCH</button>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
