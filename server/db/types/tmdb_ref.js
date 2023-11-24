const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const TmdbRefSchema = new Schema({
  id: {
    type: Number,
    requried: true,
    trim: true,
  },
  name: {
    type: String, //From TMDB
    required: true,
    trim: true,
  },
  overview: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["movie", "tv"],
  },
  poster_path: {
    type: String,
  },
  vote_average: {
    type: Number,
  },
  first_air_date: {
    type: String,
  },
});

module.exports = TmdbRefSchema;
