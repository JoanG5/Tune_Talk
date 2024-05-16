const express = require("express");
const router = express.Router();
const Song = require("./song.model");

router.post("/", async (req, res) => {
  const { title, artist, genre, album, release_date, spotify_id, user_id } =
    req.body;
  const existingSong = await Song.findOne({ where: { spotify_id, user_id } });
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

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const songs = await Song.findAll({ where: { user_id } });
    if (songs.length === 0) {
      return res.send([{ empty: true }]);
    }
    res.send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router
  .route("/:user_id/:song_id")
  .put(async (req, res) => {
    res.send("Song updated");
  })
  .delete(async (req, res) => {
    const user_id = req.params.user_id;
    const song_id = req.params.song_id;
    try {
      const song = await Song.findOne({ where: { song_id, user_id } });
      await song.destroy();
      res.send("Song deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
