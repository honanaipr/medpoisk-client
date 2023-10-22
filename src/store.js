import { ref } from 'vue'
import { v4 as uuid4 } from 'uuid';
export const store = ref({
  list: [
    {
      id: uuid4(),
      heading: "Игла спинальная 26G (90 мм) Portex Пенсил с иглой-интродьюсером 20G",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Набор для спинально-эпидуральной анестезии Portex",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Игла спинальная (88мм) SURU для анестезии Квинке",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Медиагель - гель для УЗИ высокой вязкости бесцветный",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Набор для спинально-эпидуральной анестезии Portex",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Игла спинальная 26G (90 мм) Portex Пенсил с иглой-интродьюсером 20G",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Набор для спинально-эпидуральной анестезии Portex",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Игла спинальная (88мм) SURU для анестезии Квинке",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Медиагель - гель для УЗИ высокой вязкости бесцветный",
      amount: 12,
      min_amount: 10,
    },
    {
      id: uuid4(),
      heading: "Набор для спинально-эпидуральной анестезии Portex",
      amount: 12,
      min_amount: 10,
    },
  ],
  basket: [],
})

export function toBasket(id){
  store.value.list.splice(store.value.list.findIndex((item) => !(item.id == id)),1)
  store.value.basket.push(store.value.list.find((item) => (item.id == id)))
}

export function addItem(heading, amount, min_amount){
  store.list.push({
    id: uuid4(),
    heading: heading,
    amount: amount,
    min_amount: min_amount,
  })
}