<script setup lang="ts">
import AngleUp from '@/components/icons/AngleUp.vue'
import AngleDown from '@/components/icons/AngleDown.vue'
import { computed } from 'vue'

const props = defineProps({
  max_value: { type: Number, required: true },
  min_value: { type: Number, default: 0 },
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
  <nav class="level is-mobile" style="padding-bottom: 0.5rem">
    <div class="level-left">
      <div class="field has-addons" v-if="$route.name == 'cart'">
        <p class="control">
          <a class="button" @click="value < max_value ? value++ : () => {}">
            <AngleUp />
          </a>
        </p>
        <p class="control">
          <input class="input" type="text" placeholder="0" style="width: 3rem" v-model="value" />
        </p>
        <p class="control">
          <a class="button" @click="value > 0 ? value-- : () => {}">
            <AngleDown />
          </a>
        </p>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
