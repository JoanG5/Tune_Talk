import React, { useState, useEffect } from "react";
import SongDisplay from "../components/SongPage/SongDisplay";
import ReviewList from "../components/Reviews";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getOneTrack, getOneTrackId } from "../services/Spotify";

function Song() {
  const TEMP_USER = 1; // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
  const [songInfo, setSongInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

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
    try {
      const songData = {
        title: songInfo.name,
        artist: songInfo.artists[0].name,
        genre: "Pop", // CANT FIND GENRE IN SPOTIFY API BRUH
        album: songInfo.album.name,
        release_date: songInfo.album.release_date,
        spotify_id: songInfo.id,
        user_id: TEMP_USER, // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
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

  const handleSaveReview = async () => {
    try {
      const reviewData = {
        review: review,
        rating: rating,
        user_id: TEMP_USER, // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
        spotify_id: songId,
      };
      const response = await axios.post(
        "http://localhost:3000/songReview/",
        reviewData
      );
      console.log(response);
      setReviews([...reviews, reviewData]);
      } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleUpdateReview = async (review_id) => {
    try {
      const reviewData = {
        review: review,
        rating: rating,
      };
      const response = await axios.put(
        `http://localhost:3000/songReview/${TEMP_USER}/${review_id}/`,
        reviewData
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleDeleteReview = async (review_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/songReview/${TEMP_USER}/${review_id}/`
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div>
      <SongDisplay props={songInfo} />

      <ReviewList reviews={[0]} />

      <div className="flex justify-center">
        <Button onClick={handleSaveSong} variant="outlined">
          TEST SAVE SONG
        </Button>
      </div>
      <div className="flex justify-center">
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
            {review.user_id === TEMP_USER && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateReview(review.user_id)}
                >
                  UPDATE
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDeleteReview(review.user_id)}
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

export default Song;
