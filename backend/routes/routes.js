var express = require('express')
var Registration = require('../db/models/registration');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.get('/', function (req, res) {
  res.json({ message: 'welcome' });
});

router.post('/user', function (req, res) {
  console.log("hello", req.body);
  var regis = new Registration();
  regis.fname = req.body.fName;
  regis.lname = req.body.lName;
  regis.email = req.body.email;
  regis.dob = req.body.dateOfBirth;
  regis.gender = req.body.gender;
  regis.mobile = req.body.mobile;
  regis.city = req.body.city;
  regis.address = req.body.address;
  regis.save(function (err) {
    if (err)
      res.send(err);
    res.json({ message: req.body });
  });
});

router.get('/user', function (req, res) {
  Registration.find(function (err, registration) {
    if (err)
      res.send(err);
    res.json(registration);
  });
});


module.exports = router