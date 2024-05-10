const express = require("express");
const router = express.Router();
const User = require("./user.model");

router
  .route("/")
  .get(async (req, res) => {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users);
  })
  .post(async (req, res) => {
    const { username, email, password } = {
      username: "test",
      email: "test",
      password: "test",
    };
    User.create({
      username,
      email,
      password,
    })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

module.exports = router;
