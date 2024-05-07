import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';


function TrackList({props}) {

    return(
        <div>
            <Typography fontWeight={700} gutterBottom variant="subtitle1" component="span">
                Track List
            </Typography>
            <Divider />
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <div class="grid grid-flow-row-dense">
                        <div class="col-span-2">{props.tracks.items}</div>
                    </div>
                </ListItem>
                <Divider/>
            </List>
        </div>
    );

};

export default TrackList;