import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import TopAlbum from "../components/Home/TopAlbum";
import TopTrack from "../components/Home/TopTrack";
import Hero from "../components/Home/Hero";
import ActivityCard from "../components/ActivityCard/ActivityCard";
import Loading from "../components/Loading";
import Fade from "@mui/material/Fade";
import axios from "axios";
import {
  getTopAlbums,
  getTopTracks,
  getOneAlbumId,
  getOneTrackId,
} from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";

function Home2() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentAlbumReviews, setRecentAlbumReviews] = useState([]);
  const [recentTrackReviews, setRecentTrackReviews] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  const { user } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const albums = await getTopAlbums();
      const topTracks = await getTopTracks();

      const response = await axios.get(
        "http://localhost:3000/albumReview/recent"
      );
      const reviewsData = await Promise.all(
        response.data.map(async (review, index) => {
          const albumData = await getOneAlbumId(review.spotify_id);
          return {
            id: review.review_id,
            image: albumData.images[0].url,
            title: albumData.name,
            artist: albumData.artists.map((artist) => artist.name).join(", "),
            rating: review.rating,
            review: review.review,
            username: user.name,
            userAvatar: user.picture,
            year: new Date(review.createdAt).toLocaleDateString(),
            spotifyId: review.spotify_id,
            album: true,
            userId: review.user_id,
          };
        })
      );
      setRecentAlbumReviews(reviewsData);

      const response2 = await axios.get(
        "http://localhost:3000/songReview/recent"
      );
      const reviewsData2 = await Promise.all(
        response2.data.map(async (review, index) => {
          const songData = await getOneTrackId(review.spotify_id);
          return {
            id: review.review_id,
            image: songData.album.images[0].url,
            title: songData.name,
            artist: songData.artists.map((artist) => artist.name).join(", "),
            rating: review.rating,
            review: review.review,
            username: user.name,
            userAvatar: user.picture,
            year: new Date(review.createdAt).toLocaleDateString(),
            spotifyId: review.spotify_id,
            album: false,
            userId: review.user_id,
          };
        })
      );
      setRecentTrackReviews(reviewsData2);

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
              Trending Tracks:
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
                marginBottom: 10,
                marginX: 13,
              }}
            >
              {topAlbums.map((album) => (
                <TopAlbum key={album.id} album={album} />
              ))}
            </Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ marginTop: 5, mx: 15, fontWeight: "bold" }}
            >
              Recent Album and Song Reviews:
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
              <div style={{ display: "flex", width: "100%" }}>
                <div style={{ flex: 1, margin: 10 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Albums:
                  </Typography>
                  {recentAlbumReviews.map((review) => (
                    <ActivityCard key={review.id} activity={review} />
                  ))}
                </div>
                <div style={{ flex: 1, margin: 10 }}>
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    sx={{ marginTop: 5, fontWeight: "bold" }}
                  >
                    Songs:
                  </Typography>
                  {recentTrackReviews.map((review) => (
                    <ActivityCard key={review.id} activity={review} />
                  ))}
                </div>
              </div>
            </Box>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default Home2;
