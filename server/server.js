const express = require("express");
const cors = require("cors");
const app = express();
const sequelize = require("./database");
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userRouter = require("./routes/Users/user");
const songRouter = require("./routes/Songs/song");
const albumRouter = require("./routes/Albums/album");
const songReviewRouter = require("./routes/SongReviews/songReview");
const albumReviewRouter = require("./routes/AlbumReviews/albumReview");

app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/album", albumRouter);
app.use("/songReview", songReviewRouter);
app.use("/albumReview", albumReviewRouter);
