const express = require("express");
const mongoose = require("./configs/mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const passport = require("passport");

// app.use(bodyParser.json({ extended: true}));
app.use(express.json());

// app.use(express.urlencoded());
// app.use(passport.initialize());

app.use("/", require("./routes"));

app.listen(port, (e) => {
  if (e) {
    console.log(e);
    return false;
  }
  console.log(`server running on : ${port}`);
});
