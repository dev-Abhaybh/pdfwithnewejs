const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = function (passport) {
  passport.use(
    new jwtStrategy(
      {
        secretOrKey: "hello",
        jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
      },
      async function (jwt_payload, next) {
        db.collection("users").findOne(
          { healthIdNumber: jwt_payload.healthIdNumber },

          function (err, user) {
            if (err) {
              return next(err, false);
            }
            if (user) {
              return next(null, user);
            } else {
              return next(null, false);
            }
          }
        );
      }
    )
  );
};
