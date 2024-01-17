<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue'
import BannerComponent from './components/BannerComponent.vue'
import AddTypeModal from './components/AddTypeModal.vue'
import AuthViewVue from './views/AuthView.vue'
import { ref } from 'vue'
import { useAuthStore } from './stores/auth_store'
// import { onMounted } from 'vue'

const auth_store = useAuthStore()

// onMounted(()=>{
//   auth_store.update()
// })

let isModalActive = ref(false)
</script>

<template>
  <div
    v-if="auth_store.username"
    style="display: flex; height: 100dvh; width: 100vw; flex-direction: column; overflow: hidden"
    class="app"
  >
    <BannerComponent />
    <div class="" style="overflow-y: scroll; flex-grow: 1">
      <RouterView />
    </div>
    <BottomControls @open-add-modal="isModalActive = true" />
  </div>
  <AuthViewVue v-else/>
  <AddTypeModal :is-active="isModalActive" @close="isModalActive = false" />
</template>

<style scoped>
.app {
  background-color: var(--background-color);
}
</style>
