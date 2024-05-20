// src/components/ActivityCard.jsx
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import Rating from "@mui/material/Rating";

const ActivityCard = ({ activity }) => {
  return (
    <Card sx={{ display: "flex", marginBottom: 3, padding: 3 }}>
      <CardMedia
        component="img"
        sx={{ width: 200, height: 200, objectFit: "cover", borderRadius: 2}}
        image={activity.image}
        alt={activity.title}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          paddingLeft: 2,
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="div"
            variant="h5"
            style={{ fontWeight: "bold" }}
          >
            {activity.title}
          </Typography>
          <Rating
            name="read-only"
            value={activity.rating}
            readOnly
            sx={{ margin: "3px 0px" }}
          />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {activity.year}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="p"
            sx={{ marginTop: "3px" }}
          >
            {activity.review}
          </Typography>
        </CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: 1,
            paddingBottom: 1,
          }}
        >
          <Avatar src={activity.userAvatar} />
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{ paddingLeft: 1 }}
          >
            {activity.username}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ActivityCard;
