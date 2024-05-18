import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MusicPlayerSlider from "./SongPreview";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

function SongDisplay({ props }) {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { songId } = useParams();

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    return sum / reviews.length;
  };

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const reviews = await axios.get(
          `http://localhost:3000/songReview/${songId}`
        );
        const [songData] = await Promise.all([reviews.data]);
        setReviews(songData);
        setAverage(getAverageRating(reviews));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    };

    fetchSongInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const duration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`;
  };
  const Img = styled("img")({
    margin: "auto",
    minWidth: "72px",
    maxBlockSize: "364px",
    display: "block",
    textAlign: "right",
    borderRadius: 6,
  });

  return (
    <div>
      {props && (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            margin: "16px",
            minWidth: "500px",
            flexGrow: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Img alt={props.album.name} src={props.album.images[0].url} />
            </Grid>
            <Grid item xs={6}>
              <Typography
                fontWeight={700}
                gutterBottom
                variant="subtitle2"
                component="span"
              >
                Song
              </Typography>
              <Typography fontWeight={800} variant="h5">
                {props.name}
              </Typography>
              <Typography
                fontWeight={400}
                gutterBottom
                variant="subtitle2"
                component="span"
              >
                {props.artists[0].name} • {props.album.name} •{" "}
                {duration(props.duration_ms)}
              </Typography>
              <Typography
                fontWeight={400}
                gutterBottom
                variant="subtitle2"
                mt={2}
              >
                Song preview
              </Typography>
              <Box sx={{ mr: "64px", minWidth: "128px" }}>
                <MusicPlayerSlider src={props.preview_url} />
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  p: "12px",
                  minWidth: "200px",
                  minHeight: "120px",
                  marginBottom: "8px",
                  maxWidth: "300px",
                }}
              >
                <Typography fontWeight={700} gutterBottom component={"legend"}>
                  User Score
                </Typography>
                <Rating name="read-only" value={average} readOnly /> <br />
                <Typography gutterBottom variant="caption">
                  Based on {reviews.length} ratings
                </Typography>
              </Box>
              <Box sx={{ p: "12px", minWidth: "200px", maxWidth: "300px" }}>
                <Typography fontWeight={700} gutterBottom variant="subtitle2">
                  Details
                </Typography>
                <Divider />
                <Typography
                  fontWeight={400}
                  gutterBottom
                  variant="subtitle2"
                  mt={"16px"}
                >
                  Release Date: {props.album.release_date} <br />
                  Album: {props.album.name} <br />
                  Type: {props.type}
                  <br />
                  Track number: {props.track_number}
                  <br />
                  Genre: {props.artists.genres}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
}

export default SongDisplay;
