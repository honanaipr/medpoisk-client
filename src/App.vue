<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue'
import BannerComponent from './components/BannerComponent.vue'
import AuthViewVue from './views/AuthView.vue'
import { useAuthStore, AuthState } from './stores/auth_store'
import SpinnerComponent from './components/SpinnerComponent.vue'
import MobileFirstContainer from './components/MobileFirstContainer.vue'

const auth_store = useAuthStore()

</script>

<template>
  <MobileFirstContainer>
    <div v-if="auth_store.authState == AuthState.Pending">
      <SpinnerComponent/>
    </div>
    <div v-else-if="auth_store.authState == AuthState.Loggedin" style="display: flex; height: 100%; width: 100%; flex-direction: column; overflow: hidden;" class="app">
      <BannerComponent />
      <div class="" style="overflow-y: scroll; flex-grow: 1;">
        <RouterView />
      </div>
      <BottomControls />
    </div>
    <AuthViewVue v-else-if="auth_store.authState == AuthState.Failed"/>
  </MobileFirstContainer>
</template>

<style scoped>
.app {
  background-color: var(--background-color);
}
</style>
