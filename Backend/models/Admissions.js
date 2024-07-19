const mongoose = require("mongoose");

const AdmissionsSchema = new mongoose.Schema({
  name: "String",
  address: "String",
  phone: "String",
  age: "String",
  gender: "String",
  dob: "String",
  bloodGroup: "String",
  reason: "String",
  bed: "String",
  dateOfAdmission: "String",
});

const Admissions = mongoose.model("Admissions", AdmissionsSchema);

module.exports = Admissions;
