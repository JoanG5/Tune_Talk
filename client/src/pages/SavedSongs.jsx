import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import SavedSongItem from "../components/SavedSongItem";
import { testData } from "../services/Spotify";

function SavedSongs() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const searchTracks = async () => {
      try {
        const tracks = await testData();
        setTracks(tracks);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };

    searchTracks();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <List
        sx={{
          width: "80%",
          maxWidth: 1500,
          height: "100%",
          bgcolor: "background.paper",
        }}
      >
        {console.log(tracks)}
        <ListItem>
          <ListItem>
            <ListItemText>
              <Typography variant="h4">Saved Songs</Typography>
            </ListItemText>
          </ListItem>
        </ListItem>
        <Divider />
        {tracks.map((track) => (
          <SavedSongItem key={track.id} props={track} />
        ))}
      </List>
    </div>
  );
}

export default SavedSongs;
