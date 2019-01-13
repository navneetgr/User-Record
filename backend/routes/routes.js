var express = require('express');
var user = require('./controllers/user.controller');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.get('/', user.welcome);
router.post('/user-register', user.addUser);
router.get('/user-details', user.getUser);
router.post('/user-delete', user.deleteUser);


module.exports = router