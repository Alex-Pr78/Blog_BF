require("dotenv").config({ override: true })

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve("..", "frontend", "build")));

app.use("/api", routes)

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve("..", "frontend", "build", "index.html"))
});

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}...`);
    });
  });
