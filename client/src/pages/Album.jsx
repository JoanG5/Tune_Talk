import React, { useState, useEffect } from "react";
import TrackList from "../components/AlbumPage/TrackList";
import ReviewList from "../components/Reviews";
import AlbumDisplay from "../components/AlbumPage/AlbumDisplay";
import PostReview from "../components/PostReview";
import { getOneAlbumId } from "../services/Spotify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, List, ListItem, Divider, ListItemAvatar, Avatar, Typography, Paper, Rating, Grid } from "@mui/material";


import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Album() {
  const { user, isAuthenticated } = useAuth0();
  const [AlbumInfo, setAlbumInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

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
      } catch (error) {
        console.error("Error fetching album info:", error);
      }
    };

    fetchAlbumInfo();
  }, [albumTitle]);

  const handleSaveAlbum = async () => {
    if (status === "") {
      alert("Please select a status");
      return;
    }
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

  const handleSaveReview = async () => {
    try {
      const reviewData = {
        review: review,
        rating: rating,
        user_id: user.sub,
        spotify_id: albumId,
      };

      const response = await axios.post(
        "http://localhost:3000/albumReview",
        reviewData
      );
      console.log(response);
      setReviews([...reviews, reviewData]);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleUpdateReview = async (review_id, index) => {
    try {
      const reviewData = {
        review: review,
        rating: rating,
      };
      const response = await axios.put(
        `http://localhost:3000/albumReview/${user.sub}/${review_id}`,
        reviewData
      );
      console.log(response);
      setReviews((prevReviews) => {
        const updatedReviews = [...prevReviews];
        updatedReviews[index] = {
          ...updatedReviews[index],
          review: review,
          rating: rating,
        };
        return updatedReviews;
      });
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (review_id, index) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/albumReview/${user.sub}/${review_id}`
      );
      console.log(response);
      setReviews((prevReviews) => prevReviews.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <AlbumDisplay props={AlbumInfo} />

      <Grid container spacing={2} direction='row' alignItems='flex-start' paddingRight={4}>
        <Grid item xs={6} >
          <ReviewList reviews={[0]} />
        </Grid>
        <Grid item xs>
          <Box sx={{minWidth: '380px'}}>
            <TrackList props={AlbumInfo} />
          </Box>
        </Grid>
      </Grid>
      
      <div className="flex justify-center">
        <Button onClick={handleSaveAlbum} variant="outlined">
          TEST SAVE ALBUM
        </Button>
      </div>
      <div className="flex justify-center">
        {/*  */}
        <FormControl sx={{ m: 1, minWidth: 190 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={handleChange}>
            <MenuItem value={"Listened To"}>Listened To</MenuItem>
            <MenuItem value={"Currently Listening"}>
              Currently Listening
            </MenuItem>
            <MenuItem value={"Plan On Listening"}>Plan On Listening</MenuItem>
          </Select>
        </FormControl>
        {/*  */}

        <Button variant="outlined" onClick={handleSaveReview}>
          TEST REVIEW ALBUM
        </Button>
        <textarea
          className="outline"
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <input
          onChange={(e) => setRating(e.target.value)}
          className="outline"
          type="number"
          min={0}
          max={5}
        ></input>
      </div>

      {/* PLACE HOLDER COMMENT SECTION, JUST TO TEST GET, CAN REPLACE */}
      <div className="flex justify-center" style={{ textAlign: "center" }}>
        {reviews.map((review, index) => (
          <div className="flex flex-row" key={index}>
            <p>
              {review.review}, {review.rating}*
            </p>
            {review.user_id === user.sub && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateReview(review.review_id, index)}
                >
                  UPDATE
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteReview(review.review_id, index)}
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
      {/* END OF COMMENT SECTION */}
    </div>
  );
}

export default Album;
