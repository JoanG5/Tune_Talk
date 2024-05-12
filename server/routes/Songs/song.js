const express = require("express");
const router = express.Router();
const Song = require("./song.model");

router
  .get("/", (req, res) => {
    res.send("Song route");
  })
  .post("/", async (req, res) => {
    const { title, artist, genre, album, release_date, spotify_id, user_id } =
      req.body;
    const existingSong = await Song.findOne({ spotify_id, user_id });
    if (existingSong) {
      return res.send("Song already exists");
    }
    const song = await Song.create({
      title,
      artist,
      genre,
      album,
      release_date,
      spotify_id,
      user_id,
    });
    try {
      await song.save();
      res.send(song);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
