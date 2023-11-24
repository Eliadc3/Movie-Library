const User = require("../db/models/user.js");
const Language = require("../db/models/languages.js");

exports.addFavoriteForUser = async (req, res) => {
  let fav_type = req.params.fav_type;
  let fav = req.body;
  let user_id = req.params.id;
  let addFavorite;

  try {
    if (fav_type === "lang") {
      const lang = await Language.findById(fav);
      if (!lang) {
        return res.status(404).send("Language is not found.");
      }
    }

    const oneUser = await User.findById(user_id);
    const tv_exists = oneUser.favorites.tv.find((e) => e.id === fav.id);
    console.log(fav.id);
    const movie_exists = oneUser.favorites.movies.find((e) => e.id === fav.id);

    if (tv_exists) {
      return res.status(500).send("Unable to Add, already in favorites list");
    } else if (movie_exists) {
      return res.status(500).send("Unable to Add, already in favorites list");
    }

    if (!oneUser) {
      return res.status(404).send("Unable to add by this ID.");
    } else {
      const fav_list = getFavoritesByType(oneUser, fav_type);
      fav_list.push(fav);
      addFavorite = await oneUser.save();
    }
  } catch (err) {
    console.log(err);
  }
  if (!addFavorite) {
    res.status(400).send("Unable to Add");
  }
  return res.status(201).send(addFavorite);
};

exports.deleteFavoriteForUser = async (req, res) => {
  let user_id = req.params.id;
  let fav_id = req.params.fav_id;
  try {
    const oneUser = await User.findById(user_id);
    if (!oneUser) {
      res.status(400).send("User not found");
    }

    const tv_exists = oneUser.favorites.tv.find((e) =>
      e._id.toString().includes(fav_id)
    );
    const movie_exists = oneUser.favorites.movies.find((e) =>
      e._id.toString().includes(fav_id)
    );

    if (tv_exists) {
      oneUser.favorites.tv.pull(tv_exists);
    } else if (movie_exists) {
      oneUser.favorites.movies.pull(movie_exists);
    } else {
      res.status(400).send("Movie/TV not found");
    }

    await oneUser.save();
    res.status(201).send("Removed from favorites successfully");
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

exports.getFavoritesByUser = async (req, res) => {
  let oneUser = req.params.id;
  const allTvFavorites = [];
  const allMovieFavorites = [];
  try {
    const user = await User.findById(oneUser);
    if (!user) {
      res.status(401).send("Not found");
    }
    user.favorites.tv.forEach((e) => {
      allTvFavorites.push(e);
    });
    user.favorites.movies.forEach((e) => {
      allMovieFavorites.push(e);
    });

    res.status(201).send({ allTvFavorites, allMovieFavorites });
  } catch (err) {
    res.status(400).send(err);
  }
};

function getFavoritesByType(oneUser, fav_type) {
  let fav_list;
  switch (fav_type) {
    case "movie":
      fav_list = oneUser.favorites.movies;
      break;
    case "tv":
      fav_list = oneUser.favorites.tv;
      break;
  }
  return fav_list;
}
