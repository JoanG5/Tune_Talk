const express = require("express");
const router = express.Router();
const AlbumReview = require("./albumReview.model");

router.post("/", (req, res) => {
  AlbumReview.findOne({
    where: { user_id: req.body.user_id, spotify_id: req.body.spotify_id },
  }).then((review) => {
    if (review) {
      res.send("Review already exists");
      return;
    } else {
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
    }
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

router
  .route("/:userid/:review_id/")
  .put((req, res) => {
    AlbumReview.update(
      { review: req.body.review, rating: req.body.rating },
      { where: { user_id: req.params.userid, review_id: req.params.review_id } }
    )
      .then((review) => {
        res.send(review);
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        res.status(500).send("Error updating review");
      });
  })
  .delete((req, res) => {
    AlbumReview.destroy({
      where: { user_id: req.params.userid, review_id: req.params.review_id },
    })
      .then(() => {
        res.send("Deleted review");
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        res.status(500).send("Error deleting review");
      });
  });

router.route("/profile/:userid/").get((req, res) => {
  AlbumReview.findAll({ where: { user_id: req.params.userid } })
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
