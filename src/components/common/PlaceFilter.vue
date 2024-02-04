<script setup lang="ts">
import { Place } from '@/types';
import { usePlaceStore } from '@/stores/place_store'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import AngleDownVue from '@/components/icons/AngleDown.vue';

const selectedCategories = defineModel<Place[]>({required: true})
const place_store = usePlaceStore()

function toggleCategory(place: Place) {
  if (selectedCategories.value.filter((item) => item.id == place.id).length) {
    selectedCategories.value = selectedCategories.value.filter((item) => item.id != place.id)
  } else {
    selectedCategories.value.push(place)
  }
}
</script>

<template>
    <div class="place-filter">
        <div class="">
            <h5>Места хранения</h5>
        </div>
        <div class="place-holder">
            <template v-for="place in place_store.places" :key="place.id">
                <ButtonComponent class="place-bage" :contrast="selectedCategories.includes(place)" :has-fill="selectedCategories.includes(place)" @click="toggleCategory(place)">{{ place.title }}</ButtonComponent>
            </template>
            <ButtonComponent class="place-bage"><AngleDownVue/></ButtonComponent>
        </div>
    </div>
</template>

<style scoped lang="sass">
.place-holder
    display: flex
    flex-wrap: wrap
    gap: 8px
.place-bage
    flex-grow: 0
</style>