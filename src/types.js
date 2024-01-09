export class Doctor {
  constructor(data) {
    this.id = data.id
    this.name = data.name
  }
}

export class Room {
  constructor(data) {
    this.id = data.id
    this.title = data.title
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
    this.description = data.description
    this.barcode = data.barcode
    this.pictures = data.pictures
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
