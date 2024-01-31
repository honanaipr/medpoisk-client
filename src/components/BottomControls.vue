<script setup lang="ts">
import HomeIcon from "../components/icons/HomeIcon.vue"
import ReportIcon from "../components/icons/ReportIcon.vue"
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
        <BottomControlsButton :active="$route.name=='home'" title="Главная" @click="router.push('/')">
            <template #icon>
                <HomeIcon :active="$route.name=='home'"/>
            </template>
        </BottomControlsButton>
        <BottomControlsButton :active="$route.name=='report'" title="Отчет" @click="router.push('/report')">
            <template #icon>
                <ReportIcon :active="$route.name=='report'"/>
            </template>
        </BottomControlsButton>
        <BottomControlsButton title="Добавить" @click="onAddButtonClick">
            <template #icon>
                <PlusIcon />
            </template>
        </BottomControlsButton>
        <BottomControlsButton :active="$route.name=='basket'" title="Корзина" @click="$router.push('/basket')">
            <template #icon>
                <CartIcon :active="$route.name=='basket'"/>
            </template>
        </BottomControlsButton>
        <BottomControlsButton :active="$route.name=='profile'" title="Профиль" @click="$router.push('/profile')">
            <template #icon>
                <ProfileIcon :active="$route.name=='profile'"/>
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
BottomControlsButton
    flex-grow: 1
</style>
