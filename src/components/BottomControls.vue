<script setup>
import HomeIcon from "../components/icons/HomeIcon.vue"
import TruckIcon from "../components/icons/TruckIcon.vue"
import PlusIcon from "../components/icons/PlusIcon.vue"
import CartIcon from "../components/icons/CartIcon.vue"
import ProfileIcon from "../components/icons/ProfileIcon.vue"
import BottomControlsButton from "./BottomControlsButton.vue"
import router from "../router"

const emit = defineEmits(['openAddModal'])

function onAddButtonClick() {
    emit('openAddModal')
}

</script>
      
<template>
    <div class="bottom-controls">
        <BottomControlsButton title="Главная" @click="router.push('/')">
            <template #icon>
                <HomeIcon />
            </template>
        </BottomControlsButton>
        <BottomControlsButton title="В пути" @click="router.push('/transit')">
            <template #icon>
                <TruckIcon />
            </template>
        </BottomControlsButton>
        <BottomControlsButton title="Добавить" @click="onAddButtonClick">
            <template #icon>
                <PlusIcon />
            </template>
        </BottomControlsButton>
        <BottomControlsButton title="Корзина" @click="$router.push('/basket')">
            <template #icon>
                <CartIcon />
            </template>
        </BottomControlsButton>
        <BottomControlsButton title="Профиль" @click="$router.push('/profile')">
            <template #icon>
                <ProfileIcon />
            </template>
        </BottomControlsButton>
    </div>
</template>

<style scoped lang="sass">
.bottom-controls
    display: flex
    flex-shrink: 0
    flex-direction: row
    justify-content: space-around
    align-items: stretch
    height: 100px
    // background-color: var(--background-color)
BottomControlsButton
    flex-grow: 1
</style>
