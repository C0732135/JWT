const express = require("express");
const User = require("./models/user");
require("./db/mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

const client_secret = "abc-store-api";
const authenticateToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).send("Need token!");
  }
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, client_secret, async (err, decode) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    next();
  });
};

router.post("/users", authenticateToken, async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("No user found!");
  }
});

router.get("/users/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("No user found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
