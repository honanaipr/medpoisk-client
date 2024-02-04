<script setup lang="ts">
defineProps({
    title: String,
    hasBorder: Boolean,
    contrast: Boolean,
    hasFill: Boolean,
    centered: {type:Boolean, default: true}
})
defineEmits(['click'])
</script>

<template>
    <button @click="$emit('click')" :class="{border: hasBorder, contrast: contrast, fill: hasFill, centered: centered}">
        {{ title }}
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
    background-color: #F3F3F4
    color: #5A5A5C
    flex-grow: 1
    font-weight: 700
    cursor: pointer
button.border
    border: 1px solid #999999
button.contrast
    color: var(--active-color)
    border-color: var(--active-color)
button.contrast.fill
    color: #F8F9F9
    background-color: var(--active-color)
button.centered
    text-align: center
</style>