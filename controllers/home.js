const User = require('../model/user');

exports.getHomePage = (req, res) => {
  User.findAll({
    limit: 10,
    order: [['duroodCount', 'DESC']],
  })
    .then((users) => {
      res.render('home/home', {
        users: users,
        path: '/',
      });
    })
    .catch((err) => console.log(err));
};
