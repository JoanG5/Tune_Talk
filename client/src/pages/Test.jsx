import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import SpotifyService from "../services/Spotify";

function Home() {
  const [search, setSearch] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const authParameters = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const requestBody = new URLSearchParams();
    requestBody.append("grant_type", "client_credentials");
    requestBody.append("client_id", process.env.SPOTIFY_CLIENT_ID);
    requestBody.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        requestBody,
        authParameters
      )
      .then((response) => {
        const { access_token } = response.data;
        setAccessToken(access_token);
      })
      .catch((error) => {
        console.error("Error fetching access token:", error);
      });
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
      <Button variant="contained">Hello world</Button>
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
