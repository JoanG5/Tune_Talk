const express = require("express");
const router = express.Router();
const Album = require("./album.model");

router.post("/", async (req, res) => {
  const { title, artist, genre, release_date, spotify_id, user_id, status } =
    req.body;
  const existingAlbum = await Album.findOne({ where: { spotify_id, user_id } });
  if (existingAlbum) {
    return res.send("Album already exists");
  }
  const album = await Album.create({
    title,
    artist,
    genre,
    release_date,
    spotify_id,
    user_id,
    status,
  });
  try {
    await album.save();
    res.send(album);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const listened_albums = await Album.findAll({
      where: { user_id, status: "Listened To" },
    });
    const currently_albums = await Album.findAll({
      where: { user_id, status: "Currently Listening" },
    });
    const planned_albums = await Album.findAll({
      where: { user_id, status: "Plan On Listening" },
    });
    if (
      listened_albums.length === 0 &&
      planned_albums.length === 0 &&
      currently_albums.length === 0
    ) {
      return res.send([{ empty: true }]);
    }
    res.send({ listened_albums, currently_albums, planned_albums });
  } catch (error) {
    res.status(500).send(error);
  }
});

router
  .route("/:user_id/:album_id")
  .put(async (req, res) => {
    res.send("Song updated");
  })
  .delete(async (req, res) => {
    const user_id = req.params.user_id;
    const album_id = req.params.album_id;
    try {
      const album = await Album.findOne({ where: { album_id, user_id } });
      await album.destroy();
      res.send("Album deleted");
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.route("/status/:user_id/:album_id").put(async (req, res) => {
  const user_id = req.params.user_id;
  const album_id = req.params.album_id;
  const { status } = req.body;
  try {
    const album = await Album.findOne({ where: { album_id, user_id } });
    album.status = status;
    await album.save();
    res.send("Album status updated");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
