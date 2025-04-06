const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database/db');
const { verifyPassword } = require('../middleware/hash');

function initialize(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'  // form field name
  }, async (email, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        console.log('User not found');
        return done(null, false, { message: 'No user with that email' });
      }

      const match = await verifyPassword(password, user.password);
      if (!match) {
        console.log('Password mismatch');
        return done(null, false, { message: 'Password incorrect' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Save user ID to session
  passport.serializeUser((user, done) => done(null, user.id));

  // Retrieve user by ID
  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return done(null, result.rows[0]);
    } catch (err) {
      return done(err);
    }
  });
}

module.exports = initialize;
