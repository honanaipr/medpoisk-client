<script setup lang="ts">
import { inject, watch, ref } from 'vue';
const shiftX = inject('shiftX')
const itemref = ref(null)
const grabbed = ref(false)

const emit = defineEmits(['right','left'])


watch(shiftX, (newShiftX, oldShiftX)=>{
  if (!grabbed.value) return
  if (newShiftX === null) {
    if (oldShiftX >= 50){
      emit('left')
    }
    if (oldShiftX <= -50) {
      emit('right')
    }
    grabbed.value = false
    itemref.value.style.left = '0px'
  } else {
    if (grabbed.value) {
      itemref.value.style.left = `${Math.min(Math.max(newShiftX, -50), 50)}px`
    }
  }
}) 



</script>

<template>
  <div class="item"
    ref = "itemref"
    @mousedown="(e)=>{grabbed = true}"
    @touchstart="(e)=>{grabbed = true}"
    :class="{backer:!grabbed}"
  >
    <div class="content">
      <slot></slot>
    </div>
    <div class="left"><slot name="left"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<style scoped>
.item {
  position: relative;
  margin: 1rem 0 1rem 0;
  user-select: none;
}
.left {
  top: 0;
  position: absolute;
  left:  -50px;
  width: 50px;
  height: 100%;
}
.right {
  top: 0;
  position: absolute;
  right:  -50px;
  width: 50px;
  height: 100%;
}
.backer {
  left: 0;
  transition: all 1s ease;
}
</style>