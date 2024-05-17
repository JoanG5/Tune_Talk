import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Menu, MenuItem, IconButton } from '@mui/material';
import { getOneAlbumId } from "../services/Spotify";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';




function ReviewList() {
    const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editedRating, setEditedRating] = useState(0);
    const [editedReview, setEditedReview] = useState('');
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);

    const { user, isAuthenticated } = useAuth0();
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState("");

    const albumTitle = "Nectar";
    const { albumId } = useParams();


    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const fetchAlbumInfo = async () => {
          try {
            const trackData = await getOneAlbumId(albumId);
            const reviews = await axios.get(
              `http://localhost:3000/albumReview/${albumId}`
            );
            setReviews(reviews.data);
          } catch (error) {
            console.error("Error fetching album info:", error);
          }
        };
    
        fetchAlbumInfo();
      }, [albumTitle]);



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSaveReview = async () => {
        try {
          const reviewData = {
            review: review,
            rating: rating,
            user_id: user.sub,
            spotify_id: albumId,
          };
    
          const response = await axios.post(
            "http://localhost:3000/albumReview",
            reviewData
          );
          console.log(response);
          setReviews([...reviews, reviewData]);
          setOpen(false);
        } catch (error) {
          console.error("Error saving review:", error);
        }
      };

      const handleEditClick = (reviewId, index) => {
        setSelectedReviewIndex(index);
        setEditedRating(reviews[index].rating);
        setEditedReview(reviews[index].review);
        setEditOpen(true);
    };
    


    const handleEditClose = () => {
        setSelectedReviewIndex(null);
        setEditOpen(false);
    };

    const handleUpdateReview = async (review_id, index) => {
        try {
          const reviewData = {
            review: editedRating,
            rating: editedReview,
          };
          const response = await axios.put(
            `http://localhost:3000/albumReview/${user.sub}/${review_id}`,
            reviewData
          );
          console.log(response);
          setReviews((prevReviews) => {
            const updatedReviews = [...prevReviews];
            updatedReviews[index] = {
              ...updatedReviews[index],
              review: editedReview,
              rating: editedRating,
            };
            handleEditClose();
            return updatedReviews;
          });
        } catch (error) {
          console.error("Error updating review:", error);
        }
      };

    const handleDeleteReview = async (review_id, index) => {
        try {
          const response = await axios.delete(
            `http://localhost:3000/albumReview/${user.sub}/${review_id}`
          );
          console.log(response);
          setReviews((prevReviews) => prevReviews.filter((_, i) => i !== index));
        } catch (error) {
          console.error("Error deleting review:", error);
        }
      };



    return (
        <div style={{paddingLeft:'24px'}}>
            <Grid container spacing={0} direction='row'>
                <Grid item xs paddingLeft={2}>
                <Typography
                  fontWeight={700}
                  gutterBottom
                  variant="subtitle1"
                  component="span"
                >
                  User Reviews
                </Typography>
                <Paper elevation={1}
                  sx={{
                    p: 2,
                    marginRight: "auto",
                    minWidth: '400px',
                    flexGrow: 1,
                    overflow: 'auto',
                    maxHeight: '500px',
                  }}
                >
                        
                    {reviews.length === 0 ? (
                        <p>No reviews yet.</p>
                    ) : (
                        <Box sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
                            <List>
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
                                              <div className="col-span-2">{review.review}</div>
                                              <IconButton 
                                                style={{ position: 'absolute', top: 0, right: 0 }}
                                                aria-controls={`menu-${index}`} aria-haspopup="true" onClick={handleClick}
                                                >
                                                  <MoreHorizIcon />
                                              </IconButton>
                                              <Menu
                                                  id={`menu-${index}`}
                                                  anchorEl={anchorEl}
                                                  keepMounted
                                                  open={Boolean(anchorEl)}
                                                  onClose={handleCloseMenu}
                                              >
                                                  <MenuItem onClick={() => { handleEditClick(review.review_id, index); handleCloseMenu(); }}>
                                                    <EditOutlinedIcon sx={{ marginRight: 1 }}/>
                                                    Edit
                                                    </MenuItem>
                                                  <MenuItem 
                                                    sx={{ color:'error.main' }}
                                                    onClick={() => { handleDeleteReview(review.review_id, index); handleCloseMenu(); }}
                                                    >
                                                    <DeleteOutlinedIcon sx={{ marginRight: 1 }}/>
                                                    Delete
                                                    </MenuItem>
                                              </Menu>
                                          </div>
                                      </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>
                        </Box>
                    )}
                </Paper>
            </Grid>
        </Grid>
        <br />
        <div>
            <div style={{textAlign:"right", marginRight:'16px'}}>
            <Button variant="contained" sx={ { borderRadius: 6 } } color="primary" onClick={handleClickOpen}>
                Add Review
            </Button>
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please rate your experience and leave a comment.
                    </DialogContentText>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="review-comment"
                        label="Your Review"
                        multiline
                        rows={6}
                        type="text"
                        fullWidth
                        value={review}
                        onChange={(event) => setReview(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveReview} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

        <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Review</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please update your review.
                    </DialogContentText>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setEditedRating(newValue);
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="review-comment"
                        label="Your Review"
                        multiline
                        rows={6}
                        type="text"
                        fullWidth
                        value={review}
                        onChange={(event) => setEditedReview(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateReview} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReviewList;
