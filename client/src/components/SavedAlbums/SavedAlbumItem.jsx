import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

function SavedAlbumItem({ props }) {
  return (
    <div>
      <ListItemButton className="h-32 flex items-center justify-between">
        <ListItemAvatar>
          <Avatar
            alt={props.name}
            src={props.images[0].url}
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
          primary={`${props.total_tracks}/${props.total_tracks} Tracks`}
        />
        <div className="flex-grow" />
        <ListItemText primary="10/10" />
      </ListItemButton>
      <Divider />
    </div>
  );
}

export default SavedAlbumItem;
