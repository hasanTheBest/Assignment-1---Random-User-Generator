const express = require("express");

// Imports
const {
  randomUser,
  allUsers,
  saveUser,
  saveBulkUsers,
  updateUser,
  updateBulkUser,
  deleteUser,
  deleBulkUser,
} = require("../controller/user.controller");

// Init routes
const router = express.Router();

// Get a random user
router.get("/random", randomUser);

// Get all users, specify limit
router.get("/all", allUsers);

// Save a user
router.post("/save", saveUser);

// Save multiple users
router.post("/save-bulk", saveBulkUsers);

// Update a users
router.patch("/update", updateUser);

// Update multiple users
router.patch("/update-bulk", updateBulkUser);

// Delete a user
router.delete("/delete", deleteUser);

// Delete multiple users
router.delete("/delete-bulk", deleBulkUser);

// Export the router object
module.exports = router;
