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
    <div class="app">
      <BannerComponent />
      <div v-if="auth_store.authState == AuthState.Pending" style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        <SpinnerComponent />
      </div>
      <div v-else-if="auth_store.authState == AuthState.Loggedin" class="" style="overflow-y: scroll; flex-grow: 1;">
        <RouterView />
      </div>
      <AuthViewVue v-else-if="auth_store.authState == AuthState.Failed" />
      <BottomControls v-if="auth_store.authState == AuthState.Loggedin"/>
    </div>
  </MobileFirstContainer>
</template>

<style scoped>
.app {
  background-color: var(--background-color);
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  padding: 44px 10px 34px 10px;
}
</style>
