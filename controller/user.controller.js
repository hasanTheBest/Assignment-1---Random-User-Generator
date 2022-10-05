// Imports
const { log } = require("console");
const fs = require("fs");
const { readFile } = require("fs/promises");
const usersJSON = require("../users.json");
const { getRandomArbitrary } = require("../utils/randomNumberGeneration");

// Get a random user
const randomUser = (req, res) => {
  const randomUser = getRandomArbitrary(0, usersJSON.length);
  res.send(usersJSON[randomUser]);
};

// Get all users
const allUsers = (req, res) => {
  const { query } = req;

  // limit is specified
  if (query.limit) {
    res.send(usersJSON.slice(0, parseInt(query.limit)));
  } else {
    res.send(usersJSON);
  }
};

// Save a user
const saveUser = (req, res) => {
  const { body } = req;

  // User validation (Bonus)

  // Add user
  usersJSON.push(body);

  // write to the file
  fs.writeFile("users.json", JSON.stringify(usersJSON), (err) => {
    if (err) throw err;
    res.send(body);
  });

  // Response against save
  // res.send(usersJSON);
};

// Save multiple users
const saveBulkUsers = (req, res) => {
  // parse data from request
  const { body } = req;

  // User validation (bonus)

  // Read file
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    // update file
    updatedUsers = JSON.parse(data).concat(body);

    // Write file
    fs.writeFile("users.json", JSON.stringify(updatedUsers), (err) => {
      if (err) throw err;

      // send response
      res.send(body);
    });
  });
};

// update a User
const updateUser = (req, res) => {
  // get id
  const reqBody = req.body;

  // Get file
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    // const needUpdate = JSON.parse(data).filter(({id}) => id === reqBody.id)
    const updatedData = JSON.parse(data).map((user) => {
      if (user.id === reqBody.id) {
        return {
          ...user,
          ...reqBody,
        };
      }
      return user;
    });

    // write file
    fs.writeFile("users.json", JSON.stringify(updatedData), (err) => {
      if (err) throw err;

      res.send(updatedData.filter(({ id }) => id === reqBody.id));
    });
  });
};

// Update multiple users
const updateBulkUser = (req, res) => {
  const reqBody = req.body;

  // read file
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    const updatedUsers = JSON.parse(data).map((user) => {
      const itemFound = reqBody.find((reqUser) => reqUser.id === user.id);

      if (itemFound) {
        return {
          ...user,
          ...itemFound,
        };
      }

      return user;
    });

    // write file
    fs.writeFile("users.json", JSON.stringify(updatedUsers), (err) => {
      if (err) throw err;

      res.send(
        updatedUsers.filter(({ id }) => reqBody.find((u) => u.id === id))
      );
    });
  });
};

// Delete a user
const deleteUser = (req, res) => {
  const { id: reqId } = req.query;

  // read file
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    const afterRemove = JSON.parse(data).filter(({ id }) => id !== reqId);

    // write file
    fs.writeFile("users.json", JSON.stringify(afterRemove), (err) => {
      if (err) throw err;

      res.send(JSON.parse(data).find((user) => user.id === reqId));
    });
  });
};

// Delete multiple users
const deleBulkUser = (req, res) => {
  const ids = req.body;

  // read file
  fs.readFile("users.json", (err, data) => {
    if (err) throw err;

    const afterDeletion = JSON.parse(data).filter(
      ({ id }) => !ids.includes(id)
    );

    // write file
    fs.writeFile("users.json", JSON.stringify(afterDeletion), (err) => {
      if (err) throw err;

      res.send(JSON.parse(data).filter(({ id }) => ids.includes(id)));
    });
  });
};

// Exports
module.exports = {
  randomUser,
  allUsers,
  saveUser,
  saveBulkUsers,
  updateUser,
  updateBulkUser,
  deleteUser,
  deleBulkUser,
};
