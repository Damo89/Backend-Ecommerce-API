const express = require('express');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

//Routes
const testRoutes = require('./routes/test');
const ordersRoutes = require('./routes/orders');
const cartRoutes = require('./routes/carts');
const checkoutRoutes = require('./routes/checkout');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(morgan('dev'));

// Setup sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }));
  
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//API Endpoints
app.use('/api', testRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api', authRoutes);

//Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));