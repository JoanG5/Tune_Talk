import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

function TopAlbum({ album }) {
  const getAllArtists = (artists) => {
    let allArtists = "";
    album.artists.map((artist) => {
      allArtists += artist.name + ", ";
    });
    return allArtists.slice(0, -2);
  };

  return (
    <Card
      sx={{
        display: "flex",
        my: 3,
        mx: 2,
      }}
    >
      <Button
        component={Link}
        to={`/album/${album.id}`}
        sx={{ padding: 0, textTransform: "none" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={album.images[0].url}
          alt={album.name}
        />
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxHeight: 300,
          maxWidth: 300,
          minWidth: 300,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {album.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {getAllArtists(album.artists)}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default TopAlbum;
