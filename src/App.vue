<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue';
import Banner from './components/Banner.vue';
import AddTypeModal from "./components/AddTypeModal.vue"
import { ref } from 'vue'

let isModalActive = ref(false)
</script>

<template>
  <Banner />
  <AddTypeModal :is-active="isModalActive" @close="isModalActive = false" />
  <BottomControls @open-add-modal="isModalActive = true" />
  <div class="container is-mobile">
    <RouterView />
  </div>
</template>

<style scoped>
body {
  font-family: 'Roboto';
}
</style>
