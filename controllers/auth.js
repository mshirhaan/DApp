const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const User = require('../model/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    errorMessage: message,
    oldInput: { email: req.body.email, password: req.body.password },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      errorMessage: errors.array()[0].msg,
      oldInput: { email: req.body.email, password: req.body.password },
      validationErrors: errors.array(),
    });
  }
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          res.redirect('home');
        } else {
          return res.status(422).render('auth/login', {
            path: '/login',
            errorMessage: 'Invalid email or password',
            oldInput: { email: req.body.email, password: req.body.password },
            validationErrors: [],
          });
        }
      });
    } else {
      return res.status(422).render('auth/login', {
        path: '/login',
        errorMessage: 'Invalid email or password',
        oldInput: { email: req.body.email, password: req.body.password },
        validationErrors: [],
      });
    }
  });
};

exports.getLogout = (req, res) => {
  req.session.destroy();
  res.redirect('/home');
};

exports.getSignUp = (req, res) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    errorMessage: message,
    oldInput: { email: '', password: '' },
    validationErrors: [],
  });
};

exports.postSignUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('signup', {
      path: '/signup',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
      validationErrors: errors.array(),
    });
  }
  bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      duroodCount: 0,
    }).then((result) => {
      res.redirect('/login');
    });
  });
};
