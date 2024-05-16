import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function SavedSongItem({ props }) {
  const { user, isAuthenticated } = useAuth0();
  const [status, setStatus] = useState(props.status);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleDeleteSong = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/song/${user.sub}/${props.trackResponse.db_id}`
      );
      console.log(response);
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/song/status/${user.sub}/${props.trackResponse.db_id}`,
        { status: status }
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <ListItemButton className="h-32 flex items-center justify-between">
        <ListItemAvatar>
          <Avatar
            alt={props.trackResponse.name}
            src={props.trackResponse.album.images[0].url}
            sx={{ width: 100, height: 100, borderRadius: 2 }}
            className="m-5"
            variant="square"
          />
        </ListItemAvatar>
        <ListItemText
          sx={{ width: "30%" }}
          primary={props.trackResponse.name}
          secondary={props.trackResponse.artists[0].name}
        />
        <ListItemText
          sx={{ width: "30%" }}
          primary={props.trackResponse.album.name}
          secondary="Album"
        />
        <Button variant="outlined" onClick={handleUpdateStatus}>
          Update
        </Button>
        <FormControl sx={{ m: 2, minWidth: 190 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status" onChange={handleChange}>
            <MenuItem value={"Listened To"}>Listened To</MenuItem>
            <MenuItem value={"Plan On Listening"}>Plan On Listening</MenuItem>
          </Select>
        </FormControl>
        <div className="flex-grow" />
        <ListItemText sx={{ m: 3 }} primary="10/10" />
        <Button onClick={handleDeleteSong} variant="outlined">
          Delete
        </Button>
      </ListItemButton>
      <Divider />
    </div>
  );
}

export default SavedSongItem;
