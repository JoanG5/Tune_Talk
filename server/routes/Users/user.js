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

module.exports = router;
