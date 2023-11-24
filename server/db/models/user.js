const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const TmdbRefSchema = require("../types/tmdb_ref.js");
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  member_since: {
    type: Date,
    default: new Date(), // default value: now
    validate(value) {
      if (validator.isAfter(value.toString()))
        throw new Error("Invalid date for 'member_since', it is in the future");
    },
  },

  favorites: {
    movies: [
      {
        type: TmdbRefSchema,
      },
    ],
    tv: [
      {
        type: TmdbRefSchema,
      },
    ],
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
