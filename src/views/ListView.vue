<script setup>
import List from '../components/ListComponent.vue'
import { store } from '../store.js'
import ListItem from '../components/ListItem.vue';
</script>

<template>
  <List :source="store.list" :configurable-list-item="ListItem" />
</template>
