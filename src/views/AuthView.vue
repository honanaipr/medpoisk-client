<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth_store';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputComponent from '@/components/InputComponent.vue';

const auth_store = useAuthStore()
const username = ref('')
const password = ref('')
</script>

<template>
    <div class="header">
        <h2>Добро пожаловать!</h2>
        <InputComponent v-model="username" placeholder="example@medpoisk.com" title="Email"/>
        <InputComponent v-model="password" placeholder="*************" title="Пароль" type="password"/>
        <div style="display: flex; flex-direction: row; gap: 8px">
            <ButtonComponent @click="auth_store.login(username, password)" title="Войти" contrast has-border has-fill/>
        </div>
    </div>
</template>

<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  gap: 16px
  padding: 0 10px 0 10px
.header
  padding: 0 20px 0 20px
  color: #121212
  font-weight: bold
  margin-bottom: 16px
.header h2
  font-size: 16px
  margin-bottom: 16px
</style>
