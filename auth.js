module.exports = function setupauth (Graduate,app) {
	var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;

/*  // High level serialize/de-serialize configuration for passport
  passport.serializeUser(function(user, done) {
    console.log('I am in seralize');
    done('I am in deseralize');
  });

  passport.deserializeUser(function(id, done) {
 	console.log('I ma in deseralize');
  });
*/
  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      // TODO: and use the Config service here
      clientID:  "1094430367309064",   //process.env.FACEBOOK_CLIENT_ID,
      clientSecret:  "5f1d398663ff8c2b5bbfcdd2af3ec4bb", //process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
      	console.log(profile);
      	console.log("No email assosicated");
        //return done('No emails associated with this account!');
      }

/*      User.findOneAndUpdate(
        { 'data.oauth': profile.id },
        {
          $set: {
            'profile.username': profile.emails[0].value,
            'profile.picture': 'http://graph.facebook.com/' +
              profile.id.toString() + '/picture?type=large'
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });*/
        done('I am done');
        console.log("I am done here");
    }));

  // Express middlewares
  app.use(require('express-session')({
    secret: 'this is a secret'
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] }));

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/fail' }),
    function(req, res) {
      res.send('Welcome, ' + req.user.profile.username);
    });
}