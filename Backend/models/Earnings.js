const mongoose = require("mongoose");

const earningsSchema = new mongoose.Schema({
  parentID: { type: String, required: true },
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  earnings: { type: Number, default: 0 },
});

const Earnings = mongoose.model("Earnings", earningsSchema);

module.exports = Earnings;
