<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { usePlaceStore } from '@/stores/place_store';
const place_store = usePlaceStore()

import { ref } from 'vue';

const newPlaceTitle = ref('')

function createPlace(){
    place_store.addPlace({title: newPlaceTitle.value, division_id: 1})
}

</script>

<template>
    <div class="header">
        <h1>Места хранения</h1>
        <h2>Добавить новое</h2>
        <InputComponent v-model="newPlaceTitle"/>
        <div style="display: flex; flex-direction: row; gap: 8px">
            <ButtonComponent title="Отменить" contrast has-border/>
            <ButtonComponent @click="createPlace" title="Добавить" contrast has-fill/>
        </div>
    </div>
    <div class="container">
        <template v-for="place of place_store.places" :key="place.id">
            <ButtonComponent :title="place.title" />
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
  color: #121212
  font-weight: bold
  margin-bottom: 16px
.header h1
  font-size: 20px
  margin-bottom: 16px
.header h2
  font-size: 16px
</style>