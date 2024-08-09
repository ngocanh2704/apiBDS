var express = require('express');
const { loginUserController } = require('../controllers/usersController');
const { isAuth } = require('../controllers/middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('login');
});

router.post('/',loginUserController)


module.exports = router;