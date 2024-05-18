import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { spotifySearch } from "../../services/Spotify";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export const Searchbar = () => {
  const { user, isAuthenticated } = useAuth0();
  const [searchTracks, setSearchTracks] = useState([]);
  const [searchAlbums, setSearchAlbums] = useState([]);

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
    if (!searchTerm) {
      setSearchAlbums([]);
      setSearchTracks([]);
      return;
    }
    const response = await spotifySearch(searchTerm);
    setSearchTracks(response.tracks);
    setSearchAlbums(response.albums);
  };

  const getAllArtists = (artists) => {
    let allArtists = "";
    artists.forEach((artist, index) => {
      if (index === artists.length - 1) {
        allArtists += artist.name;
      } else {
        allArtists += artist.name + ", ";
      }
    });
    return allArtists;
  };

  return (
    <div className="z-10">
      <input
        type="text"
        placeholder="Search for a song or album"
        className="text-black rounded outline-none border-2 pl-2 pr-4 py-2 w-64"
        onChange={(e) => spotifyQuery(e.target.value)}
      />
      <div className="w-10 flex flex-col">
        {searchTracks.map((track) => (
          <Link to={`/song/${track.id}`}>
            <Card
              sx={{
                display: "flex",
                width: 300,
                height: 100,
                border: "1px solid lightgrey",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={track.album.images[0].url}
                alt={track.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h7">
                    {track.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {track.artists[0].name}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                ></Box>
              </Box>
            </Card>
          </Link>
        ))}
        {searchAlbums.map((album) => (
          <Link to={`/album/${album.id}`}>
            <Card
              sx={{
                display: "flex",
                width: 300,
                height: 100,
                border: "1px solid lightgrey",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={album.images[0].url}
                alt={album.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h7">
                    {album.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {getAllArtists(album.artists)}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                ></Box>
              </Box>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
