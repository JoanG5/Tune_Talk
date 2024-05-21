import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SavedSongItem from "./SavedSongItem";

function SavedSongSection({ props }) {
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
        <Divider />
        {props.map((track) => (
          <SavedSongItem key={track.trackResponse.id} props={track} />
        ))}
      </List>
    </div>
  );
}

export default SavedSongSection;
