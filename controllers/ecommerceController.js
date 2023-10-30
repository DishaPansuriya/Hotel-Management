const ecommerce = require("../models/ecommerceSchema");
const jsonwebtoken = require("jsonwebtoken");

module.exports.insertData = (req, res) => {
  // if (req.body.password == req.body.confirm_password) {

    let model = new ecommerce(req.body)

    let demo = model.save(req.body);

    if (demo) {
      return res.json({ message: "inserted successfully.." });
    } else {
      return res.json({ message: "Something went wrong" });
    }
  // } else {
  //   return res.json({
  //     massage: "Password and confirm password dose not match",
  //   });
  // }
};

module.exports.viewData = (req, res) => {
  try {
    ecommerce.find({}, (e, data) => {
      if (e) {
        console.log(e);
        return false;
      }
      if (data) {
        return res.json({ Data: data });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 500, message: "Something Went Wrong!" });
  }
};

module.exports.deletedata = (req, res) => {
  ecommerce.findOne({ _id: req.params.id }, (e, data) => {
    if (e) {
      console.log(e);
      return [false, res.json({ massage: "Data not found" })];
    }
    if (data) {
      ecommerce.findOneAndDelete(req.params.id, (e, data) => {
        if (e) {
          console.log(e);
          return false;
        }
        return res.json({ massage: "Data deleted successfully" });
      });
    }
  });
};
module.exports.updatedata = (req, res) => {
  if (req.body.password == req.body.confirm_password) {
    ecommerce.findOne({ _id: req.params.id }, (e, data) => {
      if (e) {
        console.log(e);
        return [false, res.json({ massage: "Data not found" })];
      }
      if (data) {
        ecommerce.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          },
          (e, data) => {
            if (e) {
              console.log(e);
              return false;
            }
            return res.json({ massage: "Data updated successfully" });
          }
        );
      }
    });
  } else {
    return res.json({
      massage: "Password and confirm password dose not match",
    });
  }
};
module.exports.login = (req, res) => {
  ecommerce.findOne({ email: req.body.email }, (e, data) => {
    if (req.body.password != data.password) {
      return res.json({ massage: "Please enter the currect password" });
    }
    if (e) {
      console.log(e);
      return false;
    }
    if (data) {
      let token = jsonwebtoken.sign(data.toJSON(), "ecommerce", {
        expiresIn: 10000,
      });
      return res.json({ token: token });
    } else {
      return res.json({ massage: "Email not registered" });
    }
  });
};
