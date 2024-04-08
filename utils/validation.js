const Joi = require('joi');

exports.validateMenuItem = (menuItem) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string().allow('').optional(),
    ingredients: Joi.array().items(Joi.string()).optional(),
    price: Joi.number().required(),
    category: Joi.string(),
  });
  return schema.validate(menuItem);
};
