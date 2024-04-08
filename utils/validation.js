const Joi = require('joi');

exports.validateMenuItem = (menuItem) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    imageUrl: Joi.string(),
    ingredients: Joi.array().items(Joi.string()),
    price: Joi.number().required(),
    category: Joi.string(),
  });
  return schema.validate(menuItem);
};
