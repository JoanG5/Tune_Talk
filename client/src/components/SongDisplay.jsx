import { useState, useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { getOneTrack } from "../services/Spotify";

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const SongDisplay = () => {
  const [songInfo, setSongInfo] = useState(null);
  // title variable for later
  const songTitle = "Slow Dancing in the Dark"; 

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const trackData = await getOneTrack(songTitle);
        setSongInfo(trackData)
      } catch (error) {
        console.error("Error fetching song info:", error);
      }
    };

    fetchSongInfo();
  }, [songTitle]); 
  
  const duration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`
  };

  return (
    <div>
      {songInfo && (
            <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: '40%',
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
          >
            <Grid container spacing={3} direction='row' alignItems='flex-end'>
              <Grid item xs={4}>
                <ButtonBase sx={{ minWidth: '128px', maxWidth: '300px', width: 'auto', height: 'auto'}}>
                  <Img alt={songInfo.album.name} src={songInfo.album.images[0].url} />
                </ButtonBase>
              </Grid>
              <Grid item xs={8}>
                  <Typography fontWeight={700} gutterBottom variant="subtitle1" component="span">
                    Song
                  </Typography>
                  <Typography fontWeight={900} variant="h4">
                    {songInfo.name}
                  </Typography>
                  <Typography fontWeight={400} gutterBottom variant="subtitle1" component="span">
                    {songInfo.artists[0].name} • {songInfo.album.name} • {duration(songInfo.duration_ms)}
                  </Typography>
              </Grid>
            </Grid>
          </Paper>
      )}
    </div>
  );
};

export default SongDisplay;