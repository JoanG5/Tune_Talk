import React, { useState, useEffect } from "react";
import ReviewList from "../components/Reviews";
import { getOneAlbumId } from "../services/Spotify";
import AlbumDisplay from "../components/AlbumPage/AlbumDisplay";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

function Album() {
  const TEMP_USER = 1; // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
  const [AlbumInfo, setAlbumInfo] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const albumTitle = "Nectar";

  // const albumId = "6gJ8VKn5PAFcCIVaf3B2uE"; // "Nectar"
  //FOR TESTING AND EASE OF USE, UNCOMMENT ABOVE AND COMMENT OUT BELOW
  const { albumId } = useParams();

  useEffect(() => {
    const fetchAlbumInfo = async () => {
      try {
        const trackData = await getOneAlbumId(albumId);
        setAlbumInfo(trackData);
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
        user_id: TEMP_USER, // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
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
        user_id: TEMP_USER, // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
        spotify_id: albumId,
      };

      const response = await axios.post(
        "http://localhost:3000/albumReview",
        reviewData
      );
      console.log(response);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  return (
    <div>
      <AlbumDisplay props={AlbumInfo} />

      <ReviewList reviews={[0]} />
      <div className="flex justify-center">
        <Button onClick={handleSaveAlbum} variant="outlined">
          TEST SAVE ALBUM
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
    </div>
  );
}

export default Album;
