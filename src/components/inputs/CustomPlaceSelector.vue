<script setup lang="ts">
import { computed } from 'vue'
import { Place } from '@/types'

const props = defineProps({
  places: { type: Array<Place>, required: true },
  modelValue: { type: Number, required: true },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
</script>

<template>
  <div class="field">
    <label class="label">Место хронения:</label>
    <div class="control">
      <div class="select" :class="{ 'is-danger': !value }">
        <select v-model="value">
          <option disabled value="">Выбрать место</option>
          <option disabled hidden :value="null">Место не выбрано</option>
          <option v-for="place in places" :key="place.id" :value="place.id">
            {{ place.title }}
          </option>
        </select>
      </div>
    </div>
    <p class="help is-danger" v-if="!value">Поле необходимо</p>
  </div>
</template>

<style scoped></style>
