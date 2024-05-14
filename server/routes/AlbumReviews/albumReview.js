const express = require("express");
const router = express.Router();
const AlbumReview = require("./albumReview.model");

router.post("/", (req, res) => {
  AlbumReview.create({
    review: req.body.review,
    rating: req.body.rating,
    user_id: req.body.user_id,
    spotify_id: req.body.spotify_id,
  })
    .then((review) => {
      review.save();
      res.send(review);
    })
    .catch((error) => {
      console.error("Error saving review:", error);
      res.status(500).send("Error saving review");
    });
});

router.get("/:spotify_id", (req, res) => {
  AlbumReview.findAll({ where: { spotify_id: req.params.spotify_id } })
    .then((reviews) => {
      if (reviews.length === 0) {
        return res.send([{ empty: true }]);
      }
      res.send(reviews);
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      res.status(500).send("Error fetching reviews");
    });
});

module.exports = router;
