import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import SavedAlbumItem from "./SavedAlbumItem";

function SavedAlbumSection({ props }) {
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
        {props.map((album) => (
          <SavedAlbumItem key={album.id} props={album} />
        ))}
      </List>
    </div>
  );
}

export default SavedAlbumSection;
