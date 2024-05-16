import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function SavedSongItem({ props }) {
  const { user, isAuthenticated } = useAuth0();

  const handleDeleteSong = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/song/${user.sub}/${props.db_id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  return (
    <div>
      <ListItemButton className="h-32 flex items-center justify-between">
        <ListItemAvatar>
          <Avatar
            alt={props.name}
            src={props.album.images[0].url}
            sx={{ width: 100, height: 100, borderRadius: 2 }}
            className="m-5"
            variant="square"
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ width: "30%" }}
          primary={props.name}
          secondary={props.artists[0].name}
        />
        <ListItemText
          sx={{ width: "30%" }}
          primary={props.album.name}
          secondary="Album"
        />
        <div className="flex-grow" />
        <ListItemText primary="10/10" />
        <Button onClick={handleDeleteSong} variant="outlined">
          Delete
        </Button>
      </ListItemButton>
      <Divider />
    </div>
  );
}

export default SavedSongItem;
