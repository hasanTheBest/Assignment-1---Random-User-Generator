const express = require("express");

// Imports
const { randomUser } = require("../controller/user.controller");

// Init routes
const router = express.Router();

// Get a random user
router.get("/random", randomUser);

// Export the router object
module.exports = router;
