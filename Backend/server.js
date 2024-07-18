const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const model = require("./models/User");
const docModel = require("./models/Doctors");
const patModel = require("./models/Patients");

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
  model
    .findOne({ username: username })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ success: true, id: user.id, firstName: user.firstName });
        } else {
          res.json({ success: false, message: "Invalid login attempt" });
        }
      } else {
        res.json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "An error occurred" });
    });
});

//Add Doctors
app.post("/doctors", (req, res) => {
  docModel
    .create(req.body)
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

//Get Doctors
app.get("/doctors", (req, res) => {
  docModel
    .find()
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

//Delete Doctors
app.delete("/doctors", (req, res) => {
  docModel
    .delete()
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

//Add Patients
app.post("/patients", (req, res) => {
  patModel
    .create(req.body)
    .then((patients) => res.json(patients))
    .catch((err) => res.json(err));
});

//Get Patients
app.get("/patients", (req, res) => {
  patModel
    .find()
    .then((patients) => res.json(patients))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
