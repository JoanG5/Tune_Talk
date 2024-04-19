import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SavedSongSection from "../components/SavedSongs/SavedSongSection";
import { testData } from "../services/Spotify";

function SavedSongs() {
  const [tracks, setTracks] = useState([]);
  const [value, setValue] = useState("1");
  
  useEffect(() => {
    const searchTracks = async () => {
      try {
        const tracks = await testData();
        setTracks(tracks);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    searchTracks();
  }, []);

  console.log(tracks)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ListItem>
        <ListItem>
          <ListItemText>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
              variant="h4"
            >
              Saved Album
            </Typography>
          </ListItemText>
        </ListItem>
      </ListItem>
      <TabContext value={value} variant="fullWidth">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="All Songs" value="1" />
            <Tab label="Currently Listening" value="2" />
            <Tab label="Plan On Listening" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SavedSongSection props={tracks} />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}

export default SavedSongs;
