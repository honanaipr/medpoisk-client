<script setup lang="ts">
defineProps({
    hasBorder: Boolean,
    contrast: Boolean,
    hasFill: Boolean,
    centered: {type:Boolean, default: true},
    disabled: Boolean,
})
defineEmits(['click'])
</script>

<template>
    <button :disabled="disabled" @click="$emit('click')" :class="{border: hasBorder, contrast: contrast, fill: hasFill, centered: centered}">
        <slot></slot>
    </button>
</template>

<style scoped lang="sass">
button
    height: fit-content
    appearance: none
    border-radius: 8px
    border: none
    text-align: start
    padding: 10px
    background-color: var(--background-seconfary)
    color: var(--text-grey)
    flex-grow: 1
    font-size: 14px
    font-weight: 700
    cursor: pointer
button.border
    border: 1px solid var(--devider-color)
button.contrast
    color: var(--active-color)
    border-color: var(--active-color)
button.fill
    color: var(--background-color)
    background-color: var(--active-color)
button.centered
    text-align: center
button:disabled
    background-color: var(--devider-color)
    color: var(--background-color) 
    border-color: var(--text-grey)
</style>