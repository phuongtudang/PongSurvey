const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); //not the same id as profile.id, its the id generated by mongodb
});
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//go to console.developers.google.com to get clientID and clientSecret
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if(existingUser){
          //meaning we already have a user with this given id
          done(null, existingUser)
        } else {
          //meaning we dont have a user with this given id, make a new user
          new User ({ googleId: profile.id })
            .save()
            .then(user => (null, user));
        }
      })
  })
);
