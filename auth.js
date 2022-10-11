const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CLIENT_ID = '980102706086-vmei5laflaj4o12qsc8hub97gkeomugo.apps.googleusercontent.com';
var GOOGLE_CLIENT_SECRET = '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'

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done){
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(user, done){
    done(null, user);
})