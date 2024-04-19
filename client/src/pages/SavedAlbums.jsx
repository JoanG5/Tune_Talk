import React, { useEffect, useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SavedAlbumSection from "../components/SavedAlbums/SavedAlbumSection";
import { testAlbumData } from "../services/Spotify";

function SavedAlbum() {
  const [albums, setAlbums] = useState([]);
  const [value, setValue] = useState("1");

  useEffect(() => {
    const searchAlbums = async () => {
      try {
        const albums = await testAlbumData();
        setAlbums(albums);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    searchAlbums();
  }, []);

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
            <Tab label="All Albums" value="1" />
            <Tab label="Currently Listening" value="2" />
            <Tab label="Plan On Listening" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SavedAlbumSection props={albums} />
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </div>
  );
}

export default SavedAlbum;
