const express = require("express");
const router = express.Router();
const User = require("./user.model");

router
  .route("/")
  .get(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const user = await User.findOne({ where: { user_id: req.body.sub } });
    if (user) {
      res.send("User already exists");
      return;
    }
    User.create({
      user_id: req.body.sub,
      name: req.body.name,
      nickname: req.body.nickname,
      picture: req.body.picture,
    })
      .then((user) => {
        user.save();
        res.send(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

module.exports = router;
