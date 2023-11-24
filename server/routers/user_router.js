const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller.js");
const favoritesController = require("../controllers/user_favorites_controller.js");
//----------------------------------------------------------------------

// USER

// add new user
// // POST to => http://localhost:9000/users
router.post("/signup", userController.saveNewUser);

// // delete user - only server side
router.delete("/:id", userController.deleteUser);

// get user By id - only server side
router.get("/:id", userController.getOneUser);

// get all users - only server side
router.get("/", userController.getListOfUsers);

//----------------------------------------------------------------------
//FAVORITES

// Patch handler for adding a new favorite (for specific user)
router.patch(
  "/:id/favorites/:fav_type(movie|tv|cast|lang|genre)",
  favoritesController.addFavoriteForUser
);

router.delete(
  "/:id/favorites/:fav_id",
  favoritesController.deleteFavoriteForUser
);

router.get("/:id/favorites", favoritesController.getFavoritesByUser);
//----------------------------------------------------------------------

module.exports = router;
