<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth_store';

const auth_store = useAuthStore()
const username = ref('')
const password = ref('')
</script>

<template>
    <form class="form" @submit.prevent="auth_store.login(username, password)">
        <div class="field">
            <label class="label">Username:</label>
            <div class="control">
                <input class="input" type="text" v-model="username" placeholder="username" />
            </div>
        </div>
        <div class="field">
            <label class="label">Username:</label>
            <div class="control">
                <input class="input" type="text" v-model="password" placeholder="password" />
            </div>
        </div>
        <button class="button" type="submit">Submit</button>
    </form>
</template>

<style scoped lang="sass">
.form
    margin: 3rem
</style>
