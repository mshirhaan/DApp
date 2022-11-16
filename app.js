const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./util/database');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const duroodRoutes = require('./routes/durood');

const store = new SequelizeStore({ db: sequelize });
const csrfProtection = csrf();

const app = express();

app.set('view engine', 'ejs');

//app.use(helmet());
app.use(compression());
//app.use(morgan('combined'));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'we love rasulullah',
    store: store,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  console.log(req.session.user);
  if (req.session && req.session.user) {
    res.locals.name = req.session.user.name;
  } else {
    res.locals.name = null;
  }
  next();
});

app.use(homeRoutes);
app.use(authRoutes);
app.use(duroodRoutes);

// app.get('/500', (req, res) => {
//   res.render('500', { path: 'Error' });
// });

// app.use((error, req, res, next) => {
//   res.redirect('/500');
// });

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.port || 3000);
  })
  .catch((err) => console.log(err));
