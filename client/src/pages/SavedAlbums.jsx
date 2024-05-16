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
import { getAlbumDataFromDB } from "../services/Spotify";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function SavedAlbum() {
  const { user, isAuthenticated } = useAuth0();
  const [albums, setAlbums] = useState([]);
  const [listenedAlbums, setListenedAlbums] = useState([]);
  const [currentlyAlbums, setCurrentlyAlbums] = useState([]);
  const [plannedAlbums, setPlannedAlbums] = useState([]);
  const [value, setValue] = useState("1");

  useEffect(() => {
    const searchAlbums = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/album/${user.sub}`
        );
        setListenedAlbums(
          await getAlbumDataFromDB(response.data.listened_albums)
        );
        setCurrentlyAlbums(
          await getAlbumDataFromDB(response.data.currently_albums)
        );
        setPlannedAlbums(
          await getAlbumDataFromDB(response.data.planned_albums)
        );
        setAlbums([...listenedAlbums, ...currentlyAlbums, ...plannedAlbums]);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    searchAlbums();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // if (albums.length === 0) {
  //   return <Loading />;
  // }

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
            <Tab label="Listened To" value="2" />
            <Tab label="Currently Listening" value="3" />
            <Tab label="Plan On Listening" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SavedAlbumSection props={albums} />
        </TabPanel>
        <TabPanel value="2">
          <SavedAlbumSection props={listenedAlbums} />
        </TabPanel>
        <TabPanel value="3">
          <SavedAlbumSection props={currentlyAlbums} />
        </TabPanel>
        <TabPanel value="4">
          <SavedAlbumSection props={plannedAlbums} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default SavedAlbum;
