export class Doctor {
  constructor(data) {
    this.id = data.id
    this.name = data.name
  }
}

export class Room {
  constructor(data) {
    this.id = data.id
    this.number = data.number
  }
}

export class Place {
  constructor(data) {
    this.id = data.id
    this.title = data.title
  }
}

export class Product {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.amount = data.amount
    this.min_amount = data.min_amount
    this.places = data.places
    this.picture_url = data.picture_url
  }
}

export class Position {
  constructor(data) {
    this.product_id = data.product_id
    this.place_id = data.place_id
    this.amount = data.amount
  }
}

export class ListItem extends Product {
  constructor(data) {
    super(data)
    this.basketed = data.basketed || false
    this.writeOffAmount = 0
    this.writeOffPlaceID = ''
    // this.writeInAmount = 0
    // this.writeInPlaceID = ""
  }
}

export class InvoiceItem {
  constructor(product, place_id, amount) {
    this.product = product
    this.places = place_id
    this.amount = amount
  }
}

export class RoomItem extends Room {
  constructor(data) {
    super(data)
  }
}

export class DoctorItem extends Doctor {
  constructor(data) {
    super(data)
  }
}

export class PlaceItem extends Place {
  constructor(data) {
    super(data)
  }
}
