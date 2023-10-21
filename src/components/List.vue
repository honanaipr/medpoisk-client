<script setup>
import ListItem from './ListItem.vue'
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
</script>

<template>
  <div class="content">
    <h3>Наименования</h3>
  </div>
  <div class="container control-container">
    <div class="field is-grouped">
      <p class="control is-expanded has-icons-left">
        <input class="input " type="text" placeholder="Найти...">
          <span class="icon is-small is-left">
            <SearchIcon />
          </span>
      </p>
      <p class="control">
        <button class="button filter-button">
            <FilterIcon />
          </button>
      </p>
    </div>
  </div>

  <div>
    <ListItem>
      <template #heading>Игла спинальная 26G (90 мм) Portex Пенсил с иглой-интродьюсером 20G</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Игла спинальная (88мм) SURU для анестезии Квинке</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Медиагель - гель для УЗИ высокой вязкости бесцветный</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Игла спинальная 26G (90 мм) Portex Пенсил с иглой-интродьюсером 20G</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Игла спинальная (88мм) SURU для анестезии Квинке</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Медиагель - гель для УЗИ высокой вязкости бесцветный</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>
  </div>
  <!-- </article> -->
</template>

<style scoped>
/* .filter-button {
  margin-left: 1rem;
} */
.control-container {
  margin: 0.5rem;
}
div.content {
  margin-bottom: 0;
}
div.content h3 {
  margin-bottom: 0;
  margin-left: 0.5rem;
} 
</style>