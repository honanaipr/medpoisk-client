<script setup>
import List from '../components/List.vue'
import { store } from '../store.js'
import { defineProps } from 'vue';
import ListItem from '../components/ListItem.vue';
</script>

<template>
  <List :source="store.list" :configurable-list-item="ListItem" />
</template>
