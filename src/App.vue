<script setup>
import { RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue';
import BannerComponent from './components/BannerComponent.vue';
import AddTypeModal from "./components/AddTypeModal.vue"
import { ref } from 'vue'

let isModalActive = ref(false)
</script>

<template>
  <div style="display: flex; height: 100vh; width: 100vw; flex-direction: column; overflow: hidden;">
    <BannerComponent />
    <div class="" style="overflow-y: scroll; flex-grow: 1;">
      <RouterView />
    </div>
    <BottomControls @open-add-modal="isModalActive = true" />
  </div>
  <AddTypeModal :is-active="isModalActive" @close="isModalActive = false" />
</template>

<style scoped>
body {
  font-family: 'Roboto';
}
</style>
