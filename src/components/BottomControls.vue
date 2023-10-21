<script setup>
import HomeIcon from "../components/icons/HomeIcon.vue"
import TruckIcon from "../components/icons/TruckIcon.vue"
import CrossIcon from "../components/icons/CrossIcon.vue"
import TrashIcon from "../components/icons/TrashIcon.vue"
import ProfileIcon from "../components/icons/ProfileIcon.vue" 
</script>
      
<template>
    <nav class="level is-mobile bottom-controls">
        <div class="level-item has-text-centered">
            <RouterLink to="/"><span class="icon-text">
                    <span class="icon">
                        <HomeIcon />
                    </span>
                    <span>Главная</span>
                </span></RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/transit"><span class="icon-text">
                    <span class="icon">
                        <TruckIcon />
                    </span>
                    <span>В пути</span>
                </span></RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/add"><span class="icon-text">
                    <span class="icon">
                        <CrossIcon />
                    </span>
                    <span>Добавить</span>
                </span></RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/basket"><span class="icon-text">
                    <span class="icon">
                        <TrashIcon />
                    </span>
                    <span>Корзина</span>
                </span></RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/profile"><span class="icon-text">
                    <span class="icon">
                        <ProfileIcon />
                    </span>
                    <span>Профиль</span>
                </span></RouterLink>
        </div>
    </nav>
</template>

<style scoped>
.bottom-controls {
    z-index: 1;
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 0;
    padding-top: 1rem;
    padding-bottom: 1.5rem;
}
</style>
