export class Doctor {
  id: number
  username: string
  email: string
  first_name: string
  middle_name: string
  last_name: string

  constructor(data) {
    this.id = data.id
    this.username = data.username
    this.email = data.email
    this.first_name = data.first_name
    this.middle_name = data.middle_name
    this.last_name = data.last_name
  }
}

export class Room {
  id: number
  title: string
  division_id: number

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.division_id = data.division_id
  }
}

export class Place {
  id: number
  title: string
  division_id: number

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.division_id = data.division_id
  }
}

export class Picture {
  url: string

  constructor(data) {
    this.url = data.url
  }
}

export class Product {
  id: number
  title: string
  description: string
  barcode: number
  pictures: Array<Picture>

  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.barcode = data.barcode
    this.pictures = data.pictures
  }
}

export class Position {
  product_id: number
  place_id: number
  amount: number

  constructor(data) {
    this.product_id = data.product_id
    this.place_id = data.place_id
    this.amount = data.amount
  }
}

export class Limit {
  division_id: number
  product_id: number
  min_amount: number

  constructor(data) {
    this.division_id = data.division_id
    this.product_id = data.product_id
    this.min_amount = data.min_amount
  }
}

export enum ListItemState {
  PERSISTENT = 1,
  PENDING_ADDITION,
  PENDING_DELETION,
}

export class ListItem {
  product: Product
  places: Array<Place>
  amount: number
  limit: number
  state: ListItemState
  targetAmount: number | null
  targetPlaceId: number | null

  constructor(data) {
    this.product = data.product
    this.places = data.places
    this.amount = data.amount
    this.limit = data.limit
    this.state = data.state || ListItemState.PERSISTENT
    this.targetAmount = null
    this.targetPlaceId = null
  }
}

export class InvoiceItem {
  product: Product
  places: Array<Place>
  amount: number

  constructor(product: Product, places: Array<Place>, amount: number) {
    this.product = product
    this.places = places
    this.amount = amount
  }
}

// export class RoomItem extends Room {
//   constructor(data) {
//     super(data)
//   }
// }

// export class DoctorItem extends Doctor {
//   constructor(data) {
//     super(data)
//   }
// }

// export class PlaceItem extends Place {
//   constructor(data) {
//     super(data)
//   }
// }

export class InventoryItem {
  product: Product
  place: Place
  amount: number

  constructor(data) {
    this.product = data.product
    this.place = data.place
    this.amount = data.amount
  }
}