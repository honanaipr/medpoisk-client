<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="container is-align-content-center is-fluid">
        <div class="content">
            <h1>Отсканируйте код</h1>
        </div>
        <figure class="image">
            <img src="@/assets/qrscan.png">
        </figure>
    </div>
</template>

<style scoped>
figure.image {
    margin-right: 5rem;
    margin-left: 5rem;
    margin-top: 7rem;
}
</style>
