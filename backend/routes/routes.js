const express = require('express');
const user = require('./controllers/user.controller');
const { validateUser, schemas } = require('./middlewares/validation');
const router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.route('/').get(user.welcome);
router.route('/user-register').post(validateUser(schemas.authSchema), user.addUser);
router.route('/user-details').get(user.getUser);
router.route('/user-delete').post(user.deleteUser);


module.exports = router