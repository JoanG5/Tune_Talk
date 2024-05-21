import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

function TopTrack({ track }) {
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
        to={`/song/${track.id}`}
        sx={{ padding: 0, textTransform: "none" }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={track.album.images[0].url}
          alt={track.name}
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
            {track.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          ></Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default TopTrack;
