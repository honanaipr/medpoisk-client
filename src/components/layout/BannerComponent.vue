<script setup lang="ts">
import LogoIcon from '@/components/icons/LogoIcon.vue'
import AngleLeft from '@/components/icons/AngleLeft.vue'
import ButtonComponent from '../inputs/ButtonComponent.vue';
</script>
<template>
  <div class="top-controls">
    <div class="left">
      <ButtonComponent @click="$router.back">
        <AngleLeft />
      </ButtonComponent>
    </div>
    <div style="text-align: center;">
      <LogoIcon style="display: block;" />
    </div>
    <div class="right">
      <ButtonComponent>
        <AngleLeft />
      </ButtonComponent>
    </div>
  </div>
</template>

<style scoped lang="sass">
.top-controls 
  display: flex
  flex-direction: row
  justify-content: space-between
  align-items: center
  margin-bottom: 16px

.left , .right
  aspect-ratio: 16/1
  button
    background-color: #FFFFFFFF

.right
  visibility: hidden
</style>
