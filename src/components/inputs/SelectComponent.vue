<script setup lang="ts">
defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
  placeholder: { type: String, default: '' },
  options: { type: Array<{ title: string; id: number }>, required: false },
})

const model = defineModel({default: null})
</script>

<template>
  <div class="input-container">
    <span v-if="title">{{ title }}</span>
    <select v-model="model" :id="title" :name="title">
      <option hidden :value="null">{{ placeholder }}</option>
      <!-- <option disabled >Не выбрано</option> -->
      <option v-for="place in options" :key="place.id" :value="place.id">
        {{ place.title }}
      </option>
    </select>
    <span v-if="description">{{ description }}</span>
  </div>
</template>

<style scoped lang="sass">
.input-container
    display: flex
    flex-direction: column
    gap: 4px
    min-width: 0px
input, select
    background-color: var(--background-seconfary)
    border: 1px solid var(--devider-color)
    padding: 16px
    font-size: 14px
    border-radius: 8px
    font-weight: 700
    color: var(--text-black)
    width: 100%

span
    font-size: 12px
    font-weight: 600
    color: var(--inactive-color)
</style>
