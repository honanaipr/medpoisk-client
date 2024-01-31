<script setup lang="ts">
defineProps({
    active: { type: Boolean, default: false }
})
</script>

<template>
    <svg :class="active ? 'active': ''" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6.99992 0.333344C7.88397 0.333344 8.73182 0.684533 9.35694 1.30965C9.98206 1.93478 10.3333 2.78262 10.3333 3.66668C10.3333 4.55073 9.98206 5.39858 9.35694 6.0237C8.73182 6.64882 7.88397 7.00001 6.99992 7.00001C6.11586 7.00001 5.26802 6.64882 4.6429 6.0237C4.01777 5.39858 3.66659 4.55073 3.66659 3.66668C3.66659 2.78262 4.01777 1.93478 4.6429 1.30965C5.26802 0.684533 6.11586 0.333344 6.99992 0.333344ZM6.99992 8.66668C10.6833 8.66668 13.6666 10.1583 13.6666 12V13.6667H0.333252V12C0.333252 10.1583 3.31659 8.66668 6.99992 8.66668Z"
            fill="#5A5A5C" />
    </svg>
</template>

<style scoped lang="sass">
svg path
    fill: var(--inactive-color, grey)
svg.active path
    fill: var(--active-color, black)
</style>
