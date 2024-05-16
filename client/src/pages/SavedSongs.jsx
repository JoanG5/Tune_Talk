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
import Loading from "../components/Loading";
import axios from "axios";
import { getTrackDataFromDB } from "../services/Spotify";
import { useAuth0 } from "@auth0/auth0-react";

function SavedSongs() {
  const { user, isAuthenticated } = useAuth0();
  const [tracks, setTracks] = useState([]);
  const [listenedTracks, setListenedTracks] = useState([]);
  const [plannedTracks, setPlannedTracks] = useState([]);
  const [value, setValue] = useState("1");

  useEffect(() => {
    const searchTracks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/song/${user.sub}`
        );
        setListenedTracks(
          await getTrackDataFromDB(response.data.listened_songs)
        );
        setPlannedTracks(await getTrackDataFromDB(response.data.planned_songs));
        setTracks([...listenedTracks, ...plannedTracks]);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    };
    searchTracks();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // if (tracks.length === 0) {
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
              Saved Songs
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
            <Tab label="Listened To" value="2" />
            <Tab label="Plan On Listening" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SavedSongSection props={tracks} />
        </TabPanel>
        <TabPanel value="2">
          <SavedSongSection props={listenedTracks} />
        </TabPanel>
        <TabPanel value="3">
          {" "}
          <SavedSongSection props={plannedTracks} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

export default SavedSongs;
