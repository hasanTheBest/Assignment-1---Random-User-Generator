const express = require("express");

// Imports
const { randomUser, allUsers } = require("../controller/user.controller");

// Init routes
const router = express.Router();

// Get a random user
router.get("/random", randomUser);

// Get all users, specify limit
router.get("/all", allUsers);

// Export the router object
module.exports = router;
