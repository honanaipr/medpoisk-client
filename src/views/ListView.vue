<script setup>
import List from '../components/List.vue'
import {store} from '../store.js'
</script>

<template>
  <main>
    <List :source="store.list"/>
  </main>
</template>
