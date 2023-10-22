<script setup>
import List from '../components/List.vue'
import { store } from '../store.js'
</script>

<template>
  <List :source="store.list" />
</template>
