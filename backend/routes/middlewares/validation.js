const Joi = require('joi');

module.exports = {
  validateUser: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }
      if (!req.value) {
        req.value = {}
      }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    authSchema: Joi.object().keys({
      fname: Joi.string().required(),
      lname: Joi.string().required(),
      email: Joi.string().email().required(),
      dob: Joi.date().required(),
      gender: Joi.string().required(),
      mobile: Joi.number(),
      city: Joi.string().required(),
      address: Joi.string().required()
    })
  }
}