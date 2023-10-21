<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue';
</script>

<template>
  <div class="container">
    <nav class="navbar is-fixed-top">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="@/assets/logo.png" width="112" height="28">
        </a>
      </div>
    </nav>
    <BottomControls/>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
