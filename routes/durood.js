const duroodController = require('../controllers/durood');

const isAuth = require('../middleware/is-auth');

const router = require('express').Router();

router.get('/recite', isAuth, duroodController.getRecitePage);

router.post('/submit-count', duroodController.postSubmitCount);

module.exports = router;
