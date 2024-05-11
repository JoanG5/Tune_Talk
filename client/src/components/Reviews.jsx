import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import PostReview from './PostReview';

function Reviews() {
    const [reviews, setReviews] = useState([]);

    const addReview = (review) => {
        setReviews([...reviews, review]);
    };

    return (
        <div>
            <Grid container spacing={0} direction='row'>
                <Grid item xs={2} ></Grid>
                <Grid item xs={5} >
                    <Paper elevation={0}
                        sx={{
                            p: 2,
                            margin: "auto",
                            minWidth: '400px',
                            flexGrow: 1,
                            maxWidth: '100%'
                        }}
                        >
                        <Typography fontWeight={700} gutterBottom variant="subtitle1" component="span">
                        User Reviews
                        </Typography>
                        <Divider />

                        {reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {reviews.map((review, index) => (
                                    <div key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            <div className="grid grid-flow-row-dense">
                                                <div className="col-span-2">User <br />
                                                    <Rating name="read-only" value={review.rating} readOnly size='small' /> <br />
                                                </div>
                                                <div className="col-span-2">{review.comment}</div>
                                            </div>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            <PostReview addReview={addReview} />
        </div>
    );
};

export default Reviews;
