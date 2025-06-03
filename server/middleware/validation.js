// server/middleware/validation.js
function validateTool(tool) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(20).required(),
    url: Joi.string().uri().required(),
    category: Joi.string().valid(...categories).required()
  });

  return schema.validate(tool);
}