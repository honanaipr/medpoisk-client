<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue';
import TrashIcon from '../components/icons/TrashIcon.vue'
</script>

<template>
  <div class="box item">
      <slot name="heading"></slot>
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply">
          <slot name="amount"></slot>/<slot name="min_amount"></slot>
        </p>
      </div>
      <div class="level-item">
        <button class="button is-small item-control">
        <CrossIcon />
      </button>
      <button class="button is-small item-control">
        <TrashIcon />
      </button>
      </div>
      <div class="level-right">
        <p class="level-item" aria-label="reply">
            Plase
        </p>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 5px;
}

.item-control {
  width: 5rem;
}
</style>
