const mongoose = require('mongoose');
const validator = require('validator');
const ecommerceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Please enter minimum tow letters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Format is incorrect');
      }
    }
  },
  password: {
    type: String,
    required: true
  }
});
const ecommerce = mongoose.model('ecommerce', ecommerceSchema);
module.exports = ecommerce; 