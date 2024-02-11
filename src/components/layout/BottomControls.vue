<script setup lang="ts">
import HomeIcon from "@/components/icons/HomeIcon.vue"
import ReportIcon from "@/components/icons/ReportIcon.vue"
import PlusIcon from "@/components/icons/PlusIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ProfileIcon from "@/components/icons/ProfileIcon.vue"
import BottomControlsButton from "./BottomControlsButton.vue"
import router from "@/router"
import AddTypeModal from "@/components/AddTypeModal.vue"
import { ref } from 'vue'

const isModalActive = ref(false)

const profileRoutes = ['profile', 'roomManager', 'doctorManager', 'placeManager']
const addRoutes = ['addToInvoice', 'addProduct', 'addInvoice', 'addByCode']
</script>

<template>
    <div class="bottom-controls">
        <div class="bottom-controls-modals">
            <AddTypeModal v-if="isModalActive" @close="isModalActive = false" />
        </div>
        <div class="bottom-controls-buttons">
            <BottomControlsButton :active="$route.name == 'home'" title="Главная" @click="router.push('/')">
                <template #icon>
                    <HomeIcon :active="$route.name == 'home'" />
                </template>
            </BottomControlsButton>
            <BottomControlsButton :active="$route.name == 'report'" title="Отчет" @click="router.push('/report')">
                <template #icon>
                    <ReportIcon :active="$route.name == 'report'" />
                </template>
            </BottomControlsButton>
            <BottomControlsButton title="Добавить" @click="isModalActive = !isModalActive">
                <template #icon>
                    <PlusIcon :active="addRoutes.includes($route.name)"/>
                </template>
            </BottomControlsButton>
            <BottomControlsButton :active="$route.name == 'cart'" title="Корзина" @click="$router.push('/cart')">
                <template #icon>
                    <CartIcon :active="$route.name == 'cart'" />
                </template>
            </BottomControlsButton>
            <BottomControlsButton :active="$route.name == 'profile'" title="Профиль" @click="$router.push('/profile')">
                <template #icon>
                    <ProfileIcon :active="profileRoutes.includes($route.name)" />
                </template>
            </BottomControlsButton>
        </div>
    </div>
</template>

<style scoped lang="sass">
.bottom-controls-buttons
    display: flex
    flex-shrink: 0
    flex-direction: row
    justify-content: space-around
    align-items: stretch
    box-shadow: 0px 0px 10px 5px #0000001A
    margin: 0 -10px
BottomControlsButton
    flex-grow: 1
</style>
