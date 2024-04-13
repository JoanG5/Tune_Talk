import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';


function SongDisplay({props}) {
  const duration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`
  };
  const Img = styled('img')({
    margin: 'auto',
    minWidth: '128px',
    maxBlockSize: '256px',
    display: 'block',
    paddingBottom: '16px',
  });

  return (
    <div>
      {props && (
        <Paper elevation={0}
          sx={{
            p: 2,
            margin: 'auto',
            minWidth: '535px',
            flexGrow: 1,
          }}
          >
          <Grid container spacing={3} direction='row' alignItems='center' paddingRight={3}>
            <Grid item xs={3} >
                <Img alt={props.album.name} src={props.album.images[0].url} />
            </Grid>
            <Grid item xs={4}>
                <Typography fontWeight={700} gutterBottom variant="subtitle2" component="span">
                  Song
                </Typography>
                <Typography fontWeight={900} variant="h5">
                  {props.name}
                </Typography>
                <Typography fontWeight={400} gutterBottom variant="subtitle2" component="span">
                  {props.artists[0].name} • {props.album.name} • {duration(props.duration_ms)} 
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ bgcolor: grey[800], color: grey[200], p: '12px' }}>
                  <Typography fontWeight={700} gutterBottom variant="subtitle1" >
                    User Score
                  </Typography>
                  <Typography fontWeight={900} gutterBottom variant="h4" >
                    80
                  </Typography>
                  <Typography gutterBottom variant="caption">
                    Based on 100 ratings
                  </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ bgcolor: grey[800], color: grey[200], p: '12px' }}>
                  <Typography fontWeight={700} gutterBottom variant="subtitle1" >
                    Release Date:
                  </Typography>
                  <Typography fontWeight={900} gutterBottom variant="h4" >
                  {props.album.release_date}
                  </Typography>
                  <Typography fontWeight={700} gutterBottom variant="subtitle1" >
                  Album: {props.album.name} <br />
                  Type: {props.type}<br />
                  Track number: {props.track_number}<br />
                  Genre: {props.artists.genres}
                
                  </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ bgcolor: grey[800], color: grey[200], p: '10px' }}>
                  
                  
                <iframe
                  
                  title="Spotify Embed"
                  src={props.preview_url}
                  width="100%"
                  height="100%"
                  
                  allow="encrypted-media"
                ></iframe>
                
                </Box>
            </Grid>

          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default SongDisplay;