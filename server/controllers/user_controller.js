const User = require("../db/models/user.js");
const bcrypt = require("bcryptjs");

exports.saveNewUser = async (req, res) => {
  // code that takes user account information from req.body
  // and creates a user document in the user collection.
  try {
    //check if this user already exists
    let oneUser = await User.findOne({ username: req.body.username });
    if (oneUser) {
      return res.status(400).send("That user already exists!");
    } else {
      oneUser = new User(req.body);
      // const token = await oneUser.genToken();
      await oneUser.save(); // if not successful, go to catch
      return res.status(201).send({ user: oneUser });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

// ------------------------------------------------------------

// only server side
exports.deleteUser = async (req, res) => {
  let user_id = req.params.id;

  try {
    const oneUser = await User.findByIdAndDelete(user_id);

    const user_list = getListOfUsers(oneUser);
    if (user_list === undefined) {
      return res.status(400).send("Bad URL param");
    }
    res.status(201).send(oneUser);
  } catch (err) {
    res.status(400).send(err);
  }
};
// ------------------------------------------------------------
// only server side
exports.getListOfUsers = async (req, res) => {
  try {
    let allUsersList = await User.find();
    res.status(200).send(allUsersList);
    return allUsersList;
  } catch (err) {
    res.status(400).send(err);
  }
};

// only server side
exports.getOneUser = async (req, res) => {
  const oneUser = req.params.id;
  let user;
  try {
    user = await User.findById(oneUser);

    if (!user) {
      res.status(401).send("Not found");
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

//---------------------------------------------------------------------------
