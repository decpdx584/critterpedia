const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../models');

// Passport "serializes" your info to make
//it easier to log in
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
// Passport "deserializedUser" is going to
//take the id and look that up in the database
passport.deserializedUser((id, cb) => {
    cb(null, id)
    .catch(cb());
});

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, cb) => {
    db.user.findOne( {
        where: { email }
    })
    .then(user => {
        if (!user || !user.validPassword(password)) {
            cb(null, false);
        } else {
            cb(null, user);
    }
    })
    .catch(cb());
}));

module.exports = passport;