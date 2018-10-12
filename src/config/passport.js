const passport = require('passport');
require('./strategies/local.strategy')();


module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  //  store the user to the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieve user from sessionks
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
