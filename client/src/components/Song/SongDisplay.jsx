import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MusicPlayerSlider from './SongPreview';
import Divider from "@mui/material/Divider";
import Rating from '@mui/material/Rating';

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
            margin: '16px',
            minWidth: '535px',
            flexGrow: 1,
          }}
          >
          <Grid container spacing={3} direction='row' justifyContent='center' alignItems='center' paddingRight={3}>
            <Grid item xs={3} >
                <Img alt={props.album.name} src={props.album.images[0].url} />
            </Grid>
            <Grid item xs={3}>
                <Typography fontWeight={700} gutterBottom variant="subtitle2" component="span">
                  Song
                </Typography>
                <Typography fontWeight={800} variant="h5">
                  {props.name}
                </Typography>
                <Typography fontWeight={400} gutterBottom variant="subtitle2" component="span">
                  {props.artists[0].name} • {props.album.name} • {duration(props.duration_ms)} 
                </Typography>
                <Typography fontWeight={400} gutterBottom variant="subtitle2" mt={2}>
                  Song preview
                </Typography>
                <Box sx={{mr:'64px', minWidth: '128px'}}>
                  <MusicPlayerSlider src={props.preview_url} />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box sx={{ border: '2px solid grey', p: '12px', minWidth: '200px', minHeight: '185px'}}>
                  <Typography fontWeight={700} gutterBottom component={'legend'} >
                    User Score
                  </Typography>
                  <Rating name="read-only" value={4} readOnly /> <br />
                  <Typography gutterBottom variant="caption">
                    Based on 100 ratings
                  </Typography>
                </Box>
            </Grid>
            <Grid item xs>
                <Box sx={{ border: '2px solid grey', p: '12px', minWidth: '250px' }}>
                  <Typography fontWeight={700} gutterBottom variant="subtitle2" >
                    Details
                  </Typography>
                  <Divider />
                  <Typography fontWeight={400} gutterBottom variant="subtitle2" mt={'16px'} >
                  Release Date: {props.album.release_date} <br />
                  Album: {props.album.name} <br />
                  Type: {props.type}<br />
                  Track number: {props.track_number}<br />
                  Genre: {props.artists.genres}
                  </Typography>
                </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default SongDisplay;