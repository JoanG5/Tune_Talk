import React, { useState, useEffect } from "react";
import SongDisplay from "../components/SongPage/SongDisplay";
import ReviewList from "../components/Reviews";
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getOneTrack, getOneTrackId } from "../services/Spotify";

function Song() {
  const [songInfo, setSongInfo] = useState(null);
  const songTitle = "Slow Dancing in the Dark";

  // const songId = "6rY5FAWxCdAGllYEOZMbjW"; // "Slow Dancing in the Dark"
  //FOR TESTING AND EASE OF USE, UNCOMMENT ABOVE AND COMMENT OUT BELOW
  const { songId } = useParams();

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const trackData = await getOneTrackId(songId);
        setSongInfo(trackData);
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
        user_id: 1, // TEMPORARY USER ID, WILL USE AUTH0 TO GET USER ID
      };

      const response = await axios.post("http://localhost:3000/song", songData);
      console.log(response);
    } catch (error) {
      console.error("Error saving song:", error);
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
    </div>
  );
}

export default Song;
