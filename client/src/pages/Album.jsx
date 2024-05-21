import React, { useState, useEffect } from "react";
import TrackList from "../components/AlbumPage/TrackList";
import ReviewList from "../components/Reviews";
import AlbumDisplay from "../components/AlbumPage/AlbumDisplay";
import { getOneAlbumId } from "../services/Spotify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Grid, CircularProgress } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CheckIcon from "@mui/icons-material/Check";
import Fab from "@mui/material/Fab";
import { green } from "@mui/material/colors";
import Fade from "@mui/material/Fade";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "../components/Loading";

function Album() {
  const { user, isAuthenticated } = useAuth0();
  const [AlbumInfo, setAlbumInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const albumTitle = "Nectar";

  // const albumId = "6gJ8VKn5PAFcCIVaf3B2uE"; // "Nectar"
  //FOR TESTING AND EASE OF USE, UNCOMMENT ABOVE AND COMMENT OUT BELOW
  const { albumId } = useParams();

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const trackData = await getOneAlbumId(albumId);
        setAlbumInfo(trackData);
        const reviews = await axios.get(
          `http://localhost:3000/albumReview/${albumId}`
        );
        setReviews(reviews.data);
        setFadeIn(true);
      } catch (error) {
        console.error("Error fetching album info:", error);
      }
    };

    fetchAlbumInfo();
  }, [albumTitle]);

  const handleSaveAlbum = async () => {
    try {
      const albumData = {
        title: AlbumInfo.name,
        artist: AlbumInfo.artists[0].name,
        genre: "Pop", // CANT FIND GENRE IN SPOTIFY API BRUH
        release_date: AlbumInfo.release_date,
        spotify_id: AlbumInfo.id,
        user_id: user.sub,
        status: status,
      };
      const response = await axios.post(
        "http://localhost:3000/album/",
        albumData
      );
      console.log(response);
    } catch (error) {
      console.error("Error saving album:", error);
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
    await handleSaveAlbum();
  };

  if (!AlbumInfo) {
    return <Loading />;
  }

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <AlbumDisplay props={AlbumInfo} />

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
              <div class="col-span-1 flex justify-start">
                {/*  */}
                <FormControl sx={{ m: 1, minWidth: 190 }}>
                  <InputLabel>Status</InputLabel>
                  <Select value={status} label="Status" onChange={handleChange}>
                    <MenuItem value={"Listened To"}>Listened To</MenuItem>
                    <MenuItem value={"Currently Listening"}>
                      Currently Listening
                    </MenuItem>
                    <MenuItem value={"Plan On Listening"}>
                      Plan On Listening
                    </MenuItem>
                  </Select>
                </FormControl>
                {/*  */}
              </div>
              <div className="col-span-6 flex justify-start">
                <Box sx={{ minWidth: "380px" }}>
                  <TrackList props={AlbumInfo} />
                </Box>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

export default Album;
