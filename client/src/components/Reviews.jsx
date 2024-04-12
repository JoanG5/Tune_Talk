import React from "react";

function ReviewList({reviews}){
    return(
        <div >
            <p>Reviews</p>
            {reviews.length === 0 ? (
            <p>No reviews yet.</p>
            ) : (
                <p> This is a review</p>
            )}

        </div>
    );
};

export default ReviewList