<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <div class="has-text-centered">
      <figure class="image is-inline-block">
        <img src="@/assets/logo.png" width="112" height="28">
      </figure>
    </div>
    <nav class="navbar">
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/about">В пути</RouterLink>
      <RouterLink to="/about">Добавить</RouterLink>
      <RouterLink to="/about">Корзина</RouterLink>
      <RouterLink to="/about">Профиль</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
