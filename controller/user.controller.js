// Imports
const usersJSON = require("../users.json");
const { getRandomArbitrary } = require("../utils/randomNumberGeneration");

// Get a random user
const randomUser = (req, res, next) => {
  const randomUser = getRandomArbitrary(0, usersJSON.length);
  res.send(usersJSON[randomUser]);
};

// Get all users
const allUsers = (req, res, next) => {
  const { query } = req;

  // limit is specified
  if (query.limit) {
    res.send(usersJSON.slice(0, parseInt(query.limit)));
  } else {
    res.send(usersJSON);
  }
};

// Exports
module.exports = {
  randomUser,
  allUsers,
};
