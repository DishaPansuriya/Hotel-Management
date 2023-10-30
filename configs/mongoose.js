const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/Ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", console.error.bind("error", "something went wrong"));
db.once("open", (e) => {
  if (e) {
    console.log(e, "db is not connected");
    return false;
  }
  console.log("db is connected");
});
module.exports = db;