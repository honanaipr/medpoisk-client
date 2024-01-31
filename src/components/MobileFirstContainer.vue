<script setup lang="ts">
</script>

<template>
    <div class="mobile-first-container">
        <div class="mobile-first-content">
            <slot></slot></div>
    </div>
</template>

<style scoped lang="sass">
.mobile-first-container
    display: flex
    justify-content: center
    align-items: center
    height: 100vh
    background-color: DodgerBlue
.mobile-first-content
    width: 100%
    height: 100%
    max-width: 428px
    transition: height 0.1s
    background-color: red
@media (min-width: 428px)
    .mobile-first-content
        height: calc(100%  -  20px)
</style>