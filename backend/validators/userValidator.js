const Joi = require('joi');

exports.userValidator = user => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(100).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string()
    })
    return schema.validate(user)
}