import * as React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function TrackList({props}) {
    let tracklist = [];
    if (props && props.tracks.items) {
        tracklist = props.tracks.items.map(track => track.name);
    
    };
    
    return(
        <div>
            <Accordion style={{ minWidth:'120px', maxWidth: '384px', margin:'auto' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography>Track List</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {tracklist.map((track,index) => (
                        <Typography key={index}>
                            {`${index + 1}. ${track}`}
                        </Typography>
                    )) }
                    
                </AccordionDetails>
            </Accordion>
        </div>
    );

};

export default TrackList;