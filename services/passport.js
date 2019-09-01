const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const moongoose = require("mongoose");
const keys = require("../config/keys");

const User = moongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record
          done(null, existingUser);
        } else {
          //create new user
          new User({ googleId: profile.id })
            .save() //dot save will take the record and persist(save) it to the mongodb database
            .then(user => done(null, user));
        }
      });
    }
  )
);
