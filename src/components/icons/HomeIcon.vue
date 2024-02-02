<script setup lang="ts">
defineProps({
    active: {type: Boolean, default: false}
})
</script>

<template>
    <svg :class="active ? 'active': ''" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.33341 14.6667V9.66667H10.6667V14.6667H14.8334V8H17.3334L9.00008 0.5L0.666748 8H3.16675V14.6667H7.33341Z"
            fill="#5A5A5C" />
    </svg>
</template>

<style scoped lang="sass">
svg path
    fill: var(--inactive-color, grey)
svg.active path
    fill: var(--active-color, black)
</style>
