const express = require('express');
const r = express.Router();
r.use('/api', require('./api'));
module.exports = r;