<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  title: String,
  min: { type: Number, required: false },
  max: { type: Number, required: false },
})

const model = defineModel({ default: 0 })

onMounted(() => {
  if (props.min) model.value = Math.max(model.value, props.min)
  if (props.max) model.value = Math.min(model.value, props.max)
})

defineEmits(['less', 'more'])

function inc() {
  if (!props.max || model.value < props.max) {
    model.value++
  }
}

function dec() {
  if (!props.min || model.value > props.min) {
    model.value--
  }
}
</script>

<template>
  <div class="input-container">
    <span v-if="title">{{ title }}</span>
    <div class="number-input">
      <button
        @click="
          $emit('less')
          dec()
        "
      >
        -
      </button>
      <input v-model="model" type="number" :min="props.min" :max="props.max" />
      <button
        @click="
          $emit('more')
          inc()
        "
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped lang="sass">
.number-input
    display: flex
    position: relative
    justify-content: space-between


    border: 1px solid var(--devider-color)
    border-radius: 8px
    color: var(--devider-color)
    font-size: 14px
    font-weight: 700
    min-width: 0
    overflow: hidden
    input
        padding: 16px 0
        flex-grow: 1
        flex-shrink: 1
        appearance: none
        border: none
        min-height: 0
        min-width: 0
        background-color: var(--background-seconfary)
        color: var(--text-black)
        text-align: center
        font-size: 14px
        font-weight: 700
    button
        padding: 16px
        border: none
        background-color: var(--background-seconfary)
        color: var(--devider-color)
        font-size: 14px
        font-weight: 700
    button:active
        background-color: var(--devider-color)
.input-container
    display: flex
    flex-direction: column
    gap: 4px
    min-width: 0
span
    font-size: 12px
    font-weight: 600
    color: var(--inactive-color)
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance: none
  margin: 0

/* Firefox */
input[type=number]
  -moz-appearance: textfield
</style>
