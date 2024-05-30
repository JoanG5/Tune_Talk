const express = require("express");
const router = express.Router();
const SongReview = require("./songReview.model");
const User = require("../Users/user.model");

router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { user_id: req.body.user_id } });
  SongReview.findOne({
    where: { user_id: req.body.user_id, spotify_id: req.body.spotify_id },
  }).then((review) => {
    if (review) {
      res.send("Review already exists");
      return;
    } else {
      SongReview.create({
        review: req.body.review,
        rating: req.body.rating,
        user_id: req.body.user_id,
        spotify_id: req.body.spotify_id,
      })
        .then((review) => {
          review.dataValues.user = user;
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

router.get("/recent", async (req, res) => {
  try {
    const reviews = await SongReview.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]],
    });
    const userPromises = reviews.map(async (review) => {
      const user = await User.findOne({ where: { user_id: review.user_id } });
      review.dataValues.user = user;
    });

    await Promise.all(userPromises);

    res.send(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Error fetching reviews");
  }
});

router.get("/:spotify_id", async (req, res) => {
  try {
    const reviews = await SongReview.findAll({
      where: { spotify_id: req.params.spotify_id },
    });

    const userPromises = reviews.map(async (review) => {
      const user = await User.findOne({ where: { user_id: review.user_id } });
      review.dataValues.user = user; // Use `dataValues` to avoid mutating the Sequelize instance
    });

    await Promise.all(userPromises);

    res.send(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).send("Error fetching reviews");
  }
});

router
  .route("/profile/:userid/:spotify_id")
  .get((req, res) => {
    SongReview.findOne({
      where: { user_id: req.params.userid, spotify_id: req.params.spotify_id },
    })
      .then((review) => {
        if (!review) {
          return res.send({ rating: "-" });
        }
        res.send(review);
      })
      .catch((error) => {
        console.error("Error fetching review:", error);
        res.status(500).send("Error fetching review");
      });
  })
  .put((req, res) => {
    SongReview.findOne({
      where: { user_id: req.params.userid, spotify_id: req.params.spotify_id },
    })
      .then((review) => {
        if (!review) {
          SongReview.create({
            review: req.body.review,
            rating: req.body.rating,
            user_id: req.params.userid,
            spotify_id: req.params.spotify_id,
          })
            .then((review) => {
              review.save();
              res.send(review);
            })
            .catch((error) => {
              console.error("Error saving review:", error);
              res.status(500).send("Error saving review");
            });
        } else {
          review.update({ review: req.body.review, rating: req.body.rating });
          res.send(review);
        }
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        res.status(500).send("Error updating review");
      });
  });

router
  .route("/:userid/:review_id/")
  .put((req, res) => {
    SongReview.update(
      { review: req.body.review, rating: req.body.rating },
      { where: { user_id: req.params.userid, review_id: req.params.review_id } }
    )
      .then((review) => {
        res.send({ review: req.body.review, rating: req.body.rating });
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        res.status(500).send("Error updating review");
      });
  })
  .delete((req, res) => {
    SongReview.destroy({
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
  SongReview.findAll({ where: { user_id: req.params.userid } })
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
