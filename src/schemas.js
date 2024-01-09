import Joi from 'joi'

export const doctorSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string()
})

export const roomSchema = Joi.object({
  id: Joi.number(),
  number: Joi.number()
})

export const placeSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string()
})

export const productSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  amount: Joi.number(),
  min_amount: Joi.number(),
  places: Joi.array().items(placeSchema),
  barcode: Joi.number(),
  picture_url: Joi.string().allow(null)
})

export const positionSchema = Joi.object({
  product_id: Joi.number(),
  place_id: Joi.number(),
  amount: Joi.number()
})
