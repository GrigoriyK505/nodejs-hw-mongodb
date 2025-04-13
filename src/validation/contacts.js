import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(6).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    isFavourite: Joi.boolean().valid('work', 'home', 'personal').required(),
    contactType: Joi.string().valid('male', 'female', 'other').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phoneNumber: Joi.string().min(6).max(16).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    isFavourite: Joi.boolean().valid('work', 'home', 'personal').required(),
    contactType: Joi.string().valid('male', 'female', 'other').required(),
});