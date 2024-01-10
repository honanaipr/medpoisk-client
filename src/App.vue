<script setup>
import { RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue';
import BannerComponent from './components/BannerComponent.vue';
import AddTypeModal from "./components/AddTypeModal.vue"
import { ref, onMounted } from 'vue'
import { usePlaceStore } from './stores/place_store';
import { useRoomStore } from './stores/room_store';
import { useDoctorStore } from './stores/doctor_store';
import { useProductStore } from './stores/product_store';
import { useAuthStore } from './stores/auth_store';
import { useInventoryStore } from './stores/inventory_store';


const place_store = usePlaceStore()
const room_store = useRoomStore()
const doctor_store = useDoctorStore()
const product_store = useProductStore()
const auth_store = useAuthStore()
const inventory_store = useInventoryStore()

onMounted(async () => {
  try {
    await auth_store.update()
    console.log("authorized")
  } catch {
    console.log("not authorized")
  }
  Promise.all([
    place_store.update(),
    room_store.update(),
    doctor_store.update(),
    product_store.update(),
    inventory_store.update(),
  ])
    .then(() => console.log("sucsess"))
    .catch((error) => console.log(error))
})

let isModalActive = ref(false)
</script>

<template>
  <div style="display: flex; height: 100dvh; width: 100vw; flex-direction: column; overflow: hidden;" class="app">
    <BannerComponent />
    <div class="" style="overflow-y: scroll; flex-grow: 1;">
      <RouterView />
    </div>
    <BottomControls @open-add-modal="isModalActive = true" />
  </div>
  <AddTypeModal :is-active="isModalActive" @close="isModalActive = false" />
</template>

<style scoped>
.app {
  background-color: var(--background-color);
}
</style>
