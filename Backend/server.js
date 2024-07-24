const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const model = require("./models/User");
const docModel = require("./models/Doctors");
const patModel = require("./models/Patients");
const addModel = require("./models/Admissions");
const Earnings = require("./models/Earnings");
const cron = require("node-cron");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

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

// DOCTORS

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

//Delete Doctors
app.delete("/doctors", (req, res) => {
  const { id } = req.query;

  docModel
    .deleteOne({ id: id })
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

//Update status of doctors
app.put("/doctors", (req, res) => {
  const { id, status } = req.body;

  docModel
    .findOneAndUpdate({ id: id }, {
      status: status
    })
    .then((doctors) => res.json(doctors))
    .catch((err) => res.json(err));
});

// PATIENTS

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

//Delete Patients
app.delete("/patients", (req, res) => {
  const { id } = req.query;

  patModel
    .deleteOne({ id: id })
    .then((patients) => res.json(patients))
    .catch((err) => res.json(err));
});

// ADMISSIONS

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

//Delete Admissions
app.delete("/admissions", (req, res) => {
  const { id } = req.query;

  addModel
    .deleteOne({ id: id })
    .then((admissions) => res.json(admissions))
    .catch((err) => res.json(err));
});

// EARNINGS

// Update Monthly Earnings
app.post("/earnings", async (req, res) => {
  const { year, month, earnings, parentID } = req.body;

  if (
    typeof year !== "number" ||
    typeof month !== "number" ||
    typeof earnings !== "number" ||
    !parentID
  ) {
    return res.status(400).send("Invalid input data");
  }

  try {
    // Find an existing record for the specified year, month, and parentID
    const existingRecord = await Earnings.findOne({ year, month, parentID });

    if (existingRecord) {
      // Update the existing record by adding the new earnings
      existingRecord.earnings += earnings;
      await existingRecord.save();
    } else {
      // Create a new record if none exists
      const newEarnings = new Earnings({ year, month, earnings, parentID });
      await newEarnings.save();
    }

    res.status(200).send("Earnings updated successfully");
  } catch (error) {
    console.error("Error updating earnings:", error);
    res.status(500).send("Internal server error");
  }
});

// Get Earnings
app.get("/earnings", async (req, res) => {
  const { year, parentID } = req.query;

  if (!year || !parentID) {
    return res.status(400).send("Year and parentID are required");
  }

  try {
    const earningsData = await Earnings.find({ year, parentID });

    if (earningsData.length === 0) {
      return res.status(404).send("No earnings data found");
    }

    res.status(200).json(earningsData);
  } catch (error) {
    console.error("Error fetching earnings data:", error);
    res.status(500).send("Internal server error");
  }
});

// Reset Earnings at the start of each year
cron.schedule("0 0 1 1 *", async () => {
  try {
    await Earnings.deleteMany({});
    console.log("Earnings data reset for the new year");
  } catch (error) {
    console.error("Error resetting earnings data", error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
