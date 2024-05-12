import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";

function ActivityCard({ props }) {
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
            <Avatar
            alt={props.name}
            src={props.images[0].url}
            sx={{ width: 100, height: 100, borderRadius: 2 }}
            className="m-5"
            variant="square"
          />
        </div>
    )
}

export default ActivityCard;