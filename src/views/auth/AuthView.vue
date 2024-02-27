<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth_store'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'

const auth_store = useAuthStore()
const username = ref('')
const password = ref('')
</script>

<template>
  <div class="auth-view">
    <h2>Добро пожаловать!</h2>
    <InputComponent v-model="username" placeholder="example@medpoisk.com" title="Email" />
    <InputComponent v-model="password" placeholder="*************" title="Пароль" type="password" />
    <div style="display: flex; flex-direction: row; gap: 8px">
      <ButtonComponent @click="auth_store.login(username, password)" contrast has-border has-fill
        >Войти</ButtonComponent
      >
    </div>
  </div>
</template>

<style scoped lang="sass">
.auth-view
  padding: 0 10px 0 10px
  color: var(--text-black)
  font-weight: bold
  display: flex
  flex-direction: column
  gap:16px
.auth-view  h2
  font-size: 16px
  margin-bottom: 16px
</style>
