const { connection } = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

PORT = 3000;

connection();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const userRouter = require("./routes/Users/user");
const songRouter = require("./routes/Songs/song");
const albumRouter = require("./routes/Albums/album");
const reviewRouter = require("./routes/Reviews/review");
app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/album", albumRouter);
app.use("/review", reviewRouter);
