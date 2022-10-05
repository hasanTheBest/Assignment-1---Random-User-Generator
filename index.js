const express = require("express");
const userRoutes = require("./routes/user.routes");

// Express app instance
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// Routes
app.use("/user", userRoutes);

// Base url
app.get("/", (req, res) => {
  res.send("Assignment 1 - Random user, Sever running");
});

// Listen to the port
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
