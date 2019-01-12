var express = require('express')
var Registration = require('../db/models/registration');
var router = express.Router()

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'welcome' });
});

router.route('/user')
  .post(function (req, res) {
    var regis = new Registration();
    regis.name = req.body.name;
    regis.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: '' });
    });
  })

  .get(function (req, res) {
    Registration.find(function (err, registration) {
      if (err)
        res.send(err);
      res.json(registration);
    });
  });

module.exports = router