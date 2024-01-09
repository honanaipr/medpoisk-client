import Joi from 'joi'

export const doctorSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string()
})

export const roomSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  division: Joi.object({
    id: Joi.number(),
    title: Joi.string(),
  })
})

export const placeSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  division_id: Joi.number()
})

export const productSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  barcode: Joi.number().allow(null),
  description: Joi.string().allow(null),
  pictures: Joi.array().items(Joi.object({ url: Joi.string() }))
})

export const positionSchema = Joi.object({
  product_id: Joi.number(),
  place_id: Joi.number(),
  amount: Joi.number()
})
