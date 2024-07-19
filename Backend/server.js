const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const model = require("./models/User");
const docModel = require("./models/Doctors");
const patModel = require("./models/Patients");
const addModel = require("./models/Admissions");

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
  // Extract parentID from query parameters
  const { parentID } = req.query;

  // Find doctors associated with the given parentID
  docModel
    .find({ parentID })
    .then((doctors) => res.json(doctors))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//Add Patients
app.post("/patients", (req, res) => {
  patModel
    .create(req.body)
    .then((patients) => res.json(patients))
    .catch((err) => res.json(err));
});

// Get Patients
app.get("/patients", (req, res) => {
  const { parentID } = req.query;

  patModel
    .find({ parentID })
    .then((patients) => res.json(patients))
    .catch((err) => {
      console.error("Error fetching patients:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching patients" });
    });
});

// Add Admissions
app.post("/admissions", (req, res) => {
  addModel
    .create(req.body)
    .then((admissions) => res.json(admissions))
    .catch((err) => res.json(err));
});

// Get Admissions
app.get("/admissions", (req, res) => {
  const { parentID } = req.query;

  addModel
    .find({ parentID })
    .then((admissions) => res.json(admissions))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
