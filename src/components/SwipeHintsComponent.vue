<script setup lang="ts">
import SwipeRight from './icons/SwipeRight.vue'
import SwipeLeft from './icons/SwipeLeft.vue'
import DoubleClick from './icons/DoubleClickIcon.vue'
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
    margin-bottom: 16px

.swipe-hint span
    font-size: 16px
    font-weight: 600
    color: #999999
    display: flex
    flex-direction: column
    align-items: center

.swipe-hint svg
    width: 30px
    margin: 0
</style>