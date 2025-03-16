const Joi = require('joi');
const review = require('./models/review');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        State: Joi.string().required(),
        image: Joi.string().allow("", null)
    }).required()
});

module.exports.demandSchema = Joi.object({
    demand: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required().min(0),
        state: Joi.string().required(),
        country: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
})