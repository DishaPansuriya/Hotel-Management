// const passport = require("passport");
// const ecommerce = require("../models/ecommerceSchema");
// const jwtStrategy = require("passport-jwt").Strategy;
// const jwtExtract = require("passport-jwt").ExtractJwt;
// const opts = {
//   jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
//   secretOrkey: "ecommerce",
// };
// passport.use(
//   new jwtStrategy(opts, (payload, done) => {
//     ecommerce.findOne({ _id: payload._id }, (e, data) => {
//       if (e) {
//         return done(e, false);
//       }
//       if (data) {
//         return done(null, data);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );

// passport.serializeUser((data, done) => {
//   if (data) {
//     return done(null, data.id);
//   } else {
//     return done(null, false);
//   }
// });

// passport.deserializeUser((data, done) => {
//   ecommerce.findOne(data.id, (e, record) => {
//     if (e) {
//       return done(e, false);
//     }
//     if (record) {
//       return done(null, record);
//     } else {
//       return done(null, false);
//     }
//   });
// });
// module.exports = passport;

const passport = require('passport');
const ecommerce = require('../models/ecommerceSchema');
const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const opts = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'ecommerce'
}
passport.use(new jwtStrategy(opts, (payload, done) => {
  ecommerce.findOne({ _id: payload._id }, (e, data) => {
    if (e) {
      return done(e, false);
    };
    if (data) {
      return done(null, data);
    } else {
      return done(null, false);
    };
  });
}));
passport.serializeUser((data, done) => {
  if (data) {
    return done(null, data.id);
  } else {
    return done(null, false);
  };
});
passport.deserializeUser((data, done) => {
  ecommerce.findById(data.id, (e, data) => {
    if (e) {
      return done(e, false);
    };
    if (data) {
      return done(null, data);
    } else {
      return done(null, false);
    }
  })
});
module.exports = passport;
