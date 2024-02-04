<script setup lang="ts">
import { ref, provide, computed } from 'vue'

const currentX = ref(null)
const initialX = ref(null)

const shiftX = computed({
  get() {
    if (initialX.value !== null) {
      return currentX.value - initialX.value
    } else {
      return null
    }
  },
  set() {
    initialX.value = null
  },
})
provide('shiftX', shiftX)
</script>

<template>
  <div
    class="swipe-container"
    @mouseup="shiftX = null"
    @mouseleave="shiftX = 0"
    @touchend="shiftX = null"
    @mousemove="
      (e) => {
        currentX = e.pageX
      }
    "
    @touchmove="
      (e) => {
        currentX = e.touches[0].pageX
      }
    "
    @touchstart="
      (e) => {
        currentX = initialX = e.touches[0].pageX
      }
    "
    @mousedown="
      (e) => {
        currentX = initialX = e.pageX
      }
    "
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.swipe-container {
  position: relative;
  overflow-x: hidden;
}
</style>
