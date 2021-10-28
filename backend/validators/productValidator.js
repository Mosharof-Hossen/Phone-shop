const Joi = require("joi")

exports.productValidator = product => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().max(2000).required(),
        price: Joi.number().required(),
        quentity: Joi.number().required(),
        category: Joi.required()
    })
    return schema.validate(product)
}