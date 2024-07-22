const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  parentID: "String",
  id: "String",
  image: "String",
  name: "String",
  address: "String",
  phone: "String",
  age: "String",
  gender: "String",
  dob: "String",
  lisence: "String",
  department: "String",
  doj: "String",
  salary: "String",
  status: {type: "String", default: "Active"},
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
