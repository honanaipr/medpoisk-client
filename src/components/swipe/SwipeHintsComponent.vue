<script setup lang="ts">
import SwipeRight from '@/components/icons/SwipeRight.vue'
import SwipeLeft from '@/components/icons/SwipeLeft.vue'
import DoubleClick from '@/components/icons/DoubleClickIcon.vue'
</script>
<template>
  <div class="swipe-hint">
    <slot name="swipe-hints">
      <span>
        Списание
        <SwipeLeft />
      </span>
      <span>
        Информация
        <DoubleClick />
      </span>
      <span>
        В корзину
        <SwipeRight />
      </span>
    </slot>
  </div>
</template>

<style scoped lang="sass">
.swipe-hint
    display: flex
    flex-direction: row
    justify-content: space-evenly

.swipe-hint span
    font-size: 16px
    font-weight: 600
    color: var(--devider-color)
    display: flex
    flex-direction: column
    align-items: center
    justify-content: space-between
</style>
