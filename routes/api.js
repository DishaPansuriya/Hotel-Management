const express = require("express");
const r = express.Router();
const controller = require("../controllers/ecommerceController");
const passport = require("passport");

r.post("/insertdata", controller.insertData);
r.get(  "/viewdata", passport.authenticate("jwt", { session: false, failureRedirect: false }), controller.viewData);
r.delete("/deletedata/:id", controller.deletedata);
r.put("/updatedata/:id", controller.updatedata);
r.post("/login", controller.login);

module.exports = r;
