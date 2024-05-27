const express = require("express");
const router = express.Router();
const CustomSong = require("./customSong.model");


router.get('/user/:userId', async (req, res) => {
    try {
      const customSong = await CustomSong.findOne({
        where: { user_id: req.params.userId }
      });
      if (customSong) {
        res.json(customSong);
      } else {
        res.status(404).json({ error: 'Custom song not found for this user' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  router.put('/user/:userId', async (req, res) => {
    try {
      const { title, url } = req.body;
      const [customSong, created] = await CustomSong.upsert({
        user_id: req.params.userId,
        title,
        url
      }, {
        where: { user_id: req.params.userId }
      });
  
      if (created) {
        res.status(201).json(customSong);
      } else {
        res.status(200).json(customSong);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  module.exports = router;