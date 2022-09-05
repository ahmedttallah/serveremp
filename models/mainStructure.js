const mongoose = require("mongoose");

const mainStructureSchema = new mongoose.Schema({
  mainStruct: {
    type: String,
    unique: true,
    required: true,
    uppercase : true,
  },
});

const MainStructure = mongoose.model("MainStructure", mainStructureSchema);

module.exports = MainStructure;
