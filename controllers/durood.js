const User = require('../model/user');

exports.getRecitePage = (req, res) => {
  res.render('durood/recite', {
    path: '/recite',
  });
};

exports.postSubmitCount = async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  console.log(user);
  user.duroodCount = +user.duroodCount + +req.body.count;
  user
    .save()
    .then((result) => {
      res.status(200).json({
        message: 'success',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'failed',
      });
    });
};
