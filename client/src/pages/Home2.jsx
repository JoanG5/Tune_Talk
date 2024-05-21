import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopAlbum from "../components/Home/TopAlbum";
import TopTrack from "../components/Home/TopTrack";
import Hero from "../components/Home/Hero";
import Loading from "../components/Loading";
import Fade from "@mui/material/Fade";
import { getTopAlbums, getTopTracks } from "../services/Spotify";

function Home2() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const albums = await getTopAlbums();
      const topTracks = await getTopTracks();
      console.log(topTracks);
      setTopAlbums(albums);
      setTopTracks(topTracks);
      setFadeIn(true);
    };
    fetchData();
  }, []);

  return (
    <>
      <Hero />
      {topAlbums.length === 0 || topTracks.length === 0 ? (
        <Loading />
      ) : (
        <Fade in={fadeIn} timeout={1000}>
          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                marginTop: 5,
                mx: 15,
                fontWeight: "bold",
              }}
            >
              Top Tracks:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 1,
                marginX: 13,
                marginBottom: 10,
              }}
            >
              {topTracks.map((track) => (
                <TopTrack key={track.track.id} track={track.track} />
              ))}
            </Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ marginTop: 5, mx: 15, fontWeight: "bold" }}
            >
              Top Albums:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 1,
                marginBottom: 25,
                marginX: 13,
              }}
            >
              {topAlbums.map((album) => (
                <TopAlbum key={album.id} album={album} />
              ))}
            </Box>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default Home2;
