const express = require("express");
const router = express.Router();
const User = require("./user.model");

router.route("/:id").get(async (req, res) => {
  const user = await User.findOne({ where: { user_id: req.params.id } });
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).json(user);
});

router.route("/").post(async (req, res) => {
  if (await User.findOne({ where: { user_id: req.body.sub } })) {
    res.status(200).send("User already exists");
    return;
  }
  const user = await User.create({
    user_id: req.body.sub,
    name: req.body.name,
    nickname: req.body.nickname,
    picture: req.body.picture,
  });
  res.status(201).json(user);
});

module.exports = router;
