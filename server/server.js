const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const userRouter = require("./routes/user");
const songRouter = require("./routes/song");
const albumRouter = require("./routes/album");
app.use("/user", userRouter);
app.use("/song", songRouter);
app.use("/album", albumRouter);