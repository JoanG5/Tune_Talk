import React, { useState, useEffect } from "react";
import SongDisplay from "../components/SongPage/SongDisplay";
import ReviewList from "../components/Reviews";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getOneTrack, getOneTrackId } from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Song() {
  const { user, isAuthenticated } = useAuth0();
  const [songInfo, setSongInfo] = useState(null);
  const [reviews, setReviews] = useState([]);

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
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    };

    fetchSongInfo();
  }, [songTitle]);

  const handleSaveSong = async () => {
    if (status === "") {
      alert("Please select a status");
      return;
    }
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

  return (
    <div>
      <SongDisplay props={songInfo} />
      
      <Grid container spacing={2} direction='row' justifyContent='center' alignItems='center' paddingRight={4}>
        <Grid item xs={6} >
          <ReviewList reviews={[0]} />
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>

      <div className="flex justify-center">
        <Button onClick={handleSaveSong} variant="outlined">
          TEST SAVE SONG
        </Button>
      </div>
      <div className="flex justify-center">
        {/*  */}
        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={handleChange}>
            <MenuItem value={"Listened To"}>Listened To</MenuItem>
            <MenuItem value={"Plan On Listening"}>Plan On Listening</MenuItem>
          </Select>
        </FormControl>
        {/*  */}
      </div>
    </div>
  );
}

export default Song;
