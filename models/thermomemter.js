const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemperatureSchema = new Schema(
  {
    val: Number
  },
  { collection: "thermodata" }
);

const Temperature = mongoose.model("temperature", TemperatureSchema);

module.exports = Temperature;
