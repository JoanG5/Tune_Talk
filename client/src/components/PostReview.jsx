import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';

function PostReview({ addReview }) {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleReviewSubmit = () => {
        const review = {
            rating: rating,
            comment: comment
        };

        addReview(review);
        setOpen(false);
    };

    return (
        <div>
            <div style={{textAlign:"right", marginRight:'16px'}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
                        type="text"
                        fullWidth
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleReviewSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostReview;