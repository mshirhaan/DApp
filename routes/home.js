const homeController = require('../controllers/home');

const router = require('express').Router();

router.get('/', homeController.getHomePage);
router.get('/home', homeController.getHomePage);

module.exports = router;
