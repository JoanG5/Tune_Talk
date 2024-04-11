import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

function SongDisplay({props}) {
  const duration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds}`
  };
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  
  return (
    <div>
      {props && (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            minWidth: '450px',
            maxWidth: '40%',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
          >
          <Grid container spacing={3} direction='row' alignItems='flex-end'>
            <Grid item xs={4}>
              <ButtonBase sx={{ minWidth: '128px', maxWidth: '300px', width: 'auto', height: 'auto'}}>
                <Img alt={props.album.name} src={props.album.images[0].url} />
              </ButtonBase>
            </Grid>
            <Grid item xs={8}>
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
          </Grid>
        </Paper>
      )}
    </div>
  );
};

export default SongDisplay;