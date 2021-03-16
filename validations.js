// VALIDATION
const Joi = require('joi')

function  registerValidation(user) {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(user)
}

function  loginValidation(user) {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required()
    })

    return schema.validate(user)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation

