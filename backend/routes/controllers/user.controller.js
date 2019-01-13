var Registration = require('../../db/models/registration');

exports.welcome = function (req, res) {
  res.json({ message: 'welcome' });
};

exports.addUser = function (req, res) {
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
      res.send({message: 'error'});
    res.json({ message: 'success' });
  });
};

exports.getUser = function (req, res) {
  Registration.find(function (err, registration) {
    if (err)
      res.send(err);
    data = {
      "data": registration
    }
    res.json(data);
  });
};

exports.deleteUser = function (req, res) {
  Registration.findByIdAndRemove({ _id: req.body.id }, function (err, cb) {
    if (err)
      res.json(err);
    else
    res.json({ message: res.cb });
  });
};