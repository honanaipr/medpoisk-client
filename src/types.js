import Joi from "joi"

export class Doctor {
    constructor(data){
        this.id = data.id
        this.name = data.name
    }
}

export const doctorSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string(),
})

export class Room {
    constructor(data){
        this.id = data.id
        this.number = data.number
    }
}

export const roomSchema = Joi.object({
    id: Joi.string(),
    number: Joi.number(),
})

export class Place {
    constructor(data){
        this.id = data.id
        this.title = data.title
    }
}

export const placeSchema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
})


export class Product {
    constructor(data){
        this.id = data.id
        this.title = data.title
        this.amount= data.amount
        this.min_amount= data.min_amount
        this.places= data.places
    }
}

export const productSchema = Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    amount: Joi.number(),
    min_amount: Joi.number(),
    places: Joi.array().items(placeSchema),
    barcode: Joi.number(),
})

export class Position {
    constructor(data){
        this.product_id = data.product_id
        this.place_id = data.place_id
        this.amount = data.amount
    }
}

export const positionSchema = Joi.object({
    product_id: Joi.string(),
    place_id: Joi.string(),
    amount: Joi.number(),
})

export class ListItem extends Product {
    constructor (data) {
        super(data)
        this.basketed = data.basketed || false
        this.writeOffAmount = 0
        this.writeOffPlaceID = ""
    }
}

// export class BasketItem extends ListItem {
//     constructor (data) {
//         super(data)
        
//     }
// }

export class RoomItem extends Room {
    constructor (data) {
        super(data)
    }
}

export class DoctorItem extends Doctor {
    constructor (data) {
        super(data)
    }
}

export class PlaceItem extends Place {
    constructor (data) {
        super(data)
    }
}