<script setup>

</script>
      
<template>
    <nav class="level is-mobile bottom-controls">
        <div class="level-item has-text-centered">
            <RouterLink to="/">Главная</RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/about">В пути</RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/about">Добавить</RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/basket">Корзина</RouterLink>
        </div>
        <div class="level-item has-text-centered">
            <RouterLink to="/profile">Профиль</RouterLink>
        </div>
    </nav>
</template>

<style scoped>
.bottom-controls {
    z-index: 1;
    background-color: aliceblue;
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
