import React, { useEffect, useState } from "react";
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
  const [review, setReview] = useState({});
  const [rating, setRating] = useState(0);
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const getReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/songReview/profile/${user.sub}/${props.trackResponse.id}`
        );
        setReview(response.data);
      } catch (error) {
        console.error("Error fetching review:", error);
      }
    };
    getReview();
  }, []);

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

  const handleUpdateReview = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/songReview/profile/${user.sub}/${props.trackResponse.id}`,
        { rating: rating, review: "" }
      );
      console.log(response);
    } catch (error) {
      console.error("Error updating review:", error);
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
        <ListItemText sx={{ m: 3 }} primary={`${review.rating}/5`} />
        <Button onClick={handleDeleteSong} variant="outlined">
          Delete
        </Button>
      </ListItemButton>
      <Divider />
      <input
        onChange={(e) => setRating(e.target.value)}
        className="outline"
        type="number"
        min={0}
        max={5}
      ></input>
      <Button onClick={handleUpdateReview} variant="outlined">
        Update Review
      </Button>
    </div>
  );
}

export default SavedSongItem;
