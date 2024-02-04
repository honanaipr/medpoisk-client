<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import InputComponent from '@/components/inputs/InputComponent.vue';
import { usePlaceStore } from '@/stores/place_store';
const place_store = usePlaceStore()

import { ref } from 'vue';

const newPlaceTitle = ref('')

function createPlace(){
    place_store.addPlace({title: newPlaceTitle.value, division_id: 1})
    newPlaceTitle.value = ''
}

</script>

<template>
    <div class="header">
        <h1>Места хранения</h1>
        <h2>Добавить новое</h2>
        <InputComponent v-model="newPlaceTitle" placeholder="Название" title="Название"/>
        <div style="display: flex; flex-direction: row; gap: 8px">
            <ButtonComponent @click="$router.back()" contrast has-border>Отменить</ButtonComponent>
            <ButtonComponent @click="createPlace" contrast has-fill>Добавить</ButtonComponent>
        </div>
    </div>
    <div class="container">
        <template v-for="place of place_store.places" :key="place.id">
            <ButtonComponent>{{ place.title }}</ButtonComponent>
        </template>
    </div>
</template>

<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  gap: 16px
  padding: 0 10px 0 10px
.header
  padding: 0 10px 0 10px
  color: var(--text-black)
  font-weight: bold
  margin-bottom: 16px
.header h1
  font-size: 20px
  margin-bottom: 16px
.header h2
  font-size: 16px
</style>