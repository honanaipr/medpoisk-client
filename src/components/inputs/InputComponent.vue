<script setup lang="ts">

export interface Option {
  title: string
  id: number
}

defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  options: { type: Array<{ title: string; value: Object }>, required: false },
})

const model = defineModel({default: null})
</script>

<template>
  <div class="input-container">
    <span v-if="title">{{ title }}</span>
    <input
      v-bind="$attrs"
      v-if="type != 'select'"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :id="title"
      :name="title"
    />
    <select v-bind="$attrs" v-if="type == 'select'" v-model="model" :id="title" :name="title">
      <option disabled>Выбрать место</option>
      <option hidden value="null">Место не выбрано</option>
      <option v-for="(place, index) in options" :key="index" :value="place.value">
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
    flex-grow: 1
    gap: 4px
    min-width: 0px
input, select
    background-color: var(--background-seconfary)
    border: 1px solid var(--devider-color)
    padding: 16px
    font-size: 14px
    border-radius: 8px
    font-weight: 700
    color: var(--devider-color)
    width: 100%
    height: 100%

span
    font-size: 12px
    font-weight: 600
    color: var(--inactive-color)

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

input[type='number']
  -moz-appearance: textfield
</style>
