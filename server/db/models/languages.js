const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const langSchema = new Schema({
  _id: {
    type: String,
    maxLength: 2,
    minLength: 2,
  },
  name: {
    type: String,
    required: true,
  },
});

const Language = mongoose.model("languages", langSchema);

module.exports = Language;
