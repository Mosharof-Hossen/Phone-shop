const Joi = require("joi")
// const { object } = require("joi")


exports.categoryValidator = category => {
    let schema = Joi.object(({
        name: Joi.string().min(3).max(50).required()
    }))
    return schema.validate(category)
}