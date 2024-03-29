import Joi from 'joi'

export const doctorSchema = Joi.object({
  id: Joi.number(),
  username: Joi.string(),
  email: Joi.string().allow(null),
  first_name: Joi.string().allow(null),
  middle_name: Joi.string().allow(null),
  last_name: Joi.string(),
})

export const roomSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  division: Joi.object({
    id: Joi.number(),
    title: Joi.string(),
  }),
})

export const placeSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  division_id: Joi.number(),
})

export const placeShortSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
})

export const productSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  barcode: Joi.number().allow(null),
  description: Joi.string().allow(null),
  pictures: Joi.array().items(Joi.object({ url: Joi.string() })),
})

export const productShortSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
})

export const inventoryItemSchema = Joi.object({
  product: productShortSchema,
  place: placeShortSchema,
  amount: Joi.number(),
})

export const divisionSchema = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
})

export const limitSchema = Joi.object({
  division_id: Joi.number(),
  product_id: Joi.number(),
  min_amount: Joi.number(),
})

export const tokenSchema = Joi.object({
  access_token: Joi.string(),
  token_type: Joi.string().valid('bearer'),
})

export const roleInDivisionSchema = Joi.object({
  division: divisionSchema,
  role_name: Joi.string().valid('director', 'manager', 'doctor'),
  inherited: Joi.boolean(),
})

export const tokenDataSchema = Joi.object({
  username: Joi.string(),
  roles: Joi.array().items(roleInDivisionSchema),
  exp: Joi.number(),
  iat: Joi.number(),
  iss: Joi.string().valid('medpoisk-server'),
})
