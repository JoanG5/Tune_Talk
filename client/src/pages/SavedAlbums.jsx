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
import Loading from "../components/Loading";

import { testAlbumData } from "../services/Spotify";
import { testCurrAlbumData } from "../services/Spotify";

function SavedAlbum() {
  const [albums, setAlbums] = useState([]);
  const [currAlbums, setCurrAlbums] = useState([]);
  const [value, setValue] = useState("1");

  useEffect(() => {
    const searchAlbums = async () => {
      try {
        const albums = await testAlbumData();
        const currAlbums = await testCurrAlbumData();
        setAlbums(albums);
        setCurrAlbums(currAlbums);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    searchAlbums();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (albums.length === 0) {
    return <Loading />;
  }

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
          <SavedAlbumSection props={albums.slice(0, 4)} />
        </TabPanel>
        <TabPanel value="2">
          <SavedAlbumSection props={albums.slice(4, 7)} />
        </TabPanel>
        <TabPanel value="3">
          <SavedAlbumSection props={albums.slice(7)} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default SavedAlbum;
