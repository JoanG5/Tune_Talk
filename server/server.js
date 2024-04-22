const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const userRouter = require("./routes/Users/user");
const songRouter = require("./routes/Songs/song");
const albumRouter = require("./routes/Albums/album");
app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/album", albumRouter);
