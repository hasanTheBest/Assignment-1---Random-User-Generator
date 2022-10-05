// Imports
const usersJSON = require("../users.json");
const { getRandomArbitrary } = require("../utils/randomNumberGeneration");

// Get a random user
const randomUser = (req, res, next) => {
  const randomUser = getRandomArbitrary(0, usersJSON.length);
  res.send(usersJSON[randomUser]);
};

// Exports
module.exports = {
  randomUser,
};
