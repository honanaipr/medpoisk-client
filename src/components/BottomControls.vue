<script setup>
import HomeIcon from "../components/icons/HomeIcon.vue"
import TruckIcon from "../components/icons/TruckIcon.vue"
import PlusIcon from "../components/icons/PlusIcon.vue"
import TrashIcon from "../components/icons/TrashIcon.vue"
import ProfileIcon from "../components/icons/ProfileIcon.vue"
import router from "../router"


const emit = defineEmits(['openAddModal'])

function onAddButtonClick() {
    emit('openAddModal')
}

function onHomeButtonClick() {
    router.replace({ name: "home" })
}

</script>
      
<template>
    <nav class="navbar is-fixed-bottom" role="navigation" aria-label="main navigation">
        <div class="navbar-item">
            <nav class="level is-mobile bottom-controls is-spaced">
                <div class="level-item">
                    <!-- <RouterLink to="/">
                <span class="icon-text is-flex-direction-column">
                    <span class="icon">
                        <HomeIcon />
                    </span>
                    <span>Главная</span>
                </span>
            </RouterLink> -->
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
                    <!-- <RouterLink to="/transit">
                <span class="icon-text is-flex-direction-column">
                    <span class="icon">
                        <TruckIcon />
                    </span>
                    <span>В пути</span>
                </span>
            </RouterLink> -->
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
                    <!-- <button class="button is-rounded" style="display: flex; flex-direction: column; align-items: center;"
                @click="onAddButtonClick">
                <span class="icon" style="display: flex;">
                    <PlusIcon />
                </span>
                <span style="display: flex;">Добавить</span>
            </button> -->
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
                    <!-- <RouterLink to="/basket">
                <span class="icon-text is-flex-direction-column">
                    <span class="icon">
                        <TrashIcon />
                    </span>
                    <span>Корзина</span>
                </span>
            </RouterLink> -->
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
.bottom-controls {
    /* z-index: 1;
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 0; */
    /* padding-top: 1rem;
    padding-bottom: 1.5rem; */
}
</style>
