<script setup lang="ts">
defineProps({
    title: String,
    hasBorder: Boolean,
    contrast: Boolean,
    hasFill: Boolean
})
defineEmits(['click'])
</script>

<template>
    <button @click="$emit('click')" :class="{border: hasBorder, contrast: contrast, fill: hasFill}">
        {{ title }}
    </button>
</template>

<style scoped lang="sass">
button
    appearance: none
    border-radius: 8px
    border: none
    display: flex
    padding: 10px
    background-color: #F3F3F4
    color: #5A5A5C
    flex-grow: 1
    font-weight: 700
    cursor: pointer
button.border
    border: 1px solid #999999
button.contrast
    justify-content: center
    color: var(--active-color)
    border-color: var(--active-color)
button.contrast.fill
    color: #F8F9F9
    justify-content: center
    background-color: var(--active-color)
</style>