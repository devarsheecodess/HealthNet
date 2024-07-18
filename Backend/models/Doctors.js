const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
