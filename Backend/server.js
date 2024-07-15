const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const model = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/healthNetDB");

//Signup Page
app.post("/signup", (req, res) => {
  model
    .create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/signup", (req, res) => {
  model
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

//Login Page
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  model.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Logged in");
      } else {
        res.json("Invalid login attempt");
      }
    } else {
      res.json("User not found");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
