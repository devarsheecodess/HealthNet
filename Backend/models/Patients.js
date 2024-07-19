const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  parentID: "String",
  id: "String",
  name: "String",
  address: "String",
  phone: "String",
  age: "String",
  gender: "String",
  issue: "String",
  doctor: "String",
  doa: "String",
  time: "String",
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
