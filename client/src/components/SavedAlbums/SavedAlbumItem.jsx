import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

function SavedAlbumItem({ props }) {
  const getAllArtists = (artists) => {
    let allArtists = "";
    props.artists.map((artist) => {
      allArtists += artist.name + ", ";
    });
    return allArtists.slice(0, -2);
  };

  getAllArtists(props.artists);

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
          secondary={getAllArtists(props.artists)}
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
