<script setup>

const props = defineProps(['source', 'index'])
const item = props.source[props.index]
</script>

<template>
  <div class="box item">
    {{ item.product.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;">
          {{ item.amount }}
        </p>
      </div>
      <div class="level-right">
        <div class="content">
          <p style="display: block; width: 4rem;">
            {{ item.places[0].title }}
          </p>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 5px;
}

.item-control {
  width: 5rem;
}

p.place-tag {
  margin-bottom: 0;
}
</style>
