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
    background-color: #404040
.mobile-first-content
    width: 100%
    height: 100%
    max-width: 360px
    transition: height 0.1s
    overflow: hidden
@media (min-width: 360px)
    .mobile-first-content
        height: calc(100%  -  20px)
        border-radius: 15px
</style>