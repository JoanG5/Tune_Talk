import React, { useState, useEffect } from "react";
import SongDisplay from "../components/SongPage/SongDisplay";
import ReviewList from "../components/Reviews";
import { Grid, CircularProgress, Box } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getOneTrack, getOneTrackId } from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import Fab from "@mui/material/Fab";
import { green } from "@mui/material/colors";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Fade from "@mui/material/Fade";

function Song() {
  const { user, isAuthenticated } = useAuth0();
  const [songInfo, setSongInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const songTitle = "Slow Dancing in the Dark";

  // const songId = "6rY5FAWxCdAGllYEOZMbjW"; // "Slow Dancing in the Dark"
  //FOR TESTING AND EASE OF USE, UNCOMMENT ABOVE AND COMMENT OUT BELOW
  const { songId } = useParams();

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const trackData = await getOneTrackId(songId);
        setSongInfo(trackData);
        const reviews = await axios.get(
          `http://localhost:3000/songReview/${songId}`
        );
        setReviews(reviews.data);
        setFadeIn(true);
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    };

    fetchSongInfo();
  }, []);

  const handleSaveSong = async () => {
    try {
      const songData = {
        title: songInfo.name,
        artist: songInfo.artists[0].name,
        genre: "Pop", // CANT FIND GENRE IN SPOTIFY API BRUH
        album: songInfo.album.name,
        release_date: songInfo.album.release_date,
        spotify_id: songInfo.id,
        user_id: user.sub,
        status: status,
      };
      const response = await axios.post(
        "http://localhost:3000/song/",
        songData
      );
      console.log(response);
    } catch (error) {
      console.error("Error saving song:", error);
    }
  };

  // For save button
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 1000);
    }
  };

  const handleSave = async () => {
    if (status === "") {
      alert("Please select a status");
      return;
    }
    handleButtonClick();
    await handleSaveSong();
  };

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <SongDisplay props={songInfo} />

        <Grid
          container
          spacing={2}
          direction="row"
          alignItems="flex-start"
          paddingRight={4}
        >
          <Grid item xs={8}>
            <ReviewList />
          </Grid>
          <Grid
            item
            xs
            container
            direction="row"
            justifyContent="center"
            minWidth="400px"
          >
            <div class="grid grid-cols-6 gap-6 pt-8 ml-4">
              <div class="col-span-1 flex justify-start">
                <Box sx={{ m: 1, position: "relative" }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleSave}
                  >
                    {success ? <CheckIcon /> : <SaveIcon />}
                  </Fab>
                  {loading && (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Box>
              </div>
              <div>
                {/*  */}
                <FormControl sx={{ m: 1, minWidth: 190 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} label="Status" onChange={handleChange}>
                    <MenuItem value={"Listened To"}>Listened To</MenuItem>
                    <MenuItem value={"Plan On Listening"}>
                      Plan On Listening
                    </MenuItem>
                  </Select>
                </FormControl>
                {/*  */}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

export default Song;
