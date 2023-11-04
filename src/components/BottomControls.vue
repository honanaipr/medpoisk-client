<script setup>
import HomeIcon from "../components/icons/HomeIcon.vue"
import TruckIcon from "../components/icons/TruckIcon.vue"
import PlusIcon from "../components/icons/PlusIcon.vue"
import TrashIcon from "../components/icons/TrashIcon.vue"
import ProfileIcon from "../components/icons/ProfileIcon.vue"


const emit = defineEmits(['openAddModal'])

function onAddButtonClick() {
    emit('openAddModal')
}

</script>
      
<template>
    <nav class="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
        <div class="navbar-item">
            <nav class="level is-mobile bottom-controls is-spaced">
                <div class="level-item">
                    <RouterLink to="/">
                        <span class="icon-text is-flex-direction-column is-align-items-center">
                            <span class="icon">
                                <HomeIcon />
                            </span>
                            <span>Главная</span>
                        </span>
                    </RouterLink>
                </div>
                <div class="level-item">
                    <RouterLink to="/transit">
                        <span class="icon-text is-flex-direction-column is-align-items-center">
                            <span class="icon">
                                <TruckIcon />
                            </span>
                            <span>В пути</span>
                        </span>
                    </RouterLink>
                </div>
                <div class="level-item">
                    <a @click="onAddButtonClick">
                        <span class="icon-text is-flex-direction-column is-align-items-center">
                            <span class="icon">
                                <PlusIcon />
                            </span>
                            <span>Добавить</span>
                        </span>
                    </a>
                </div>
                <div class="level-item">
                    <RouterLink to="/basket">
                        <span class="icon-text is-flex-direction-column is-align-items-center">
                            <span class="icon">
                                <TrashIcon />
                            </span>
                            <span>Корзина</span>
                        </span>
                    </RouterLink>
                </div>
                <div class="level-item">
                    <RouterLink to="/profile">
                        <span class="icon-text is-flex-direction-column is-align-items-center">
                            <span class="icon">
                                <ProfileIcon />
                            </span>
                            <span>Профиль</span>
                        </span>
                    </RouterLink>
                </div>
            </nav>
        </div>
    </nav>
</template>

<style scoped>
</style>
