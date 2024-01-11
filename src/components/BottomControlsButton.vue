<script setup lang="ts">
defineProps(['title'])
</script>
      
<template>
    <button>
        <slot name="icon"></slot>
        <span>{{ title }}</span>
    </button>
</template>

<style scoped lang="sass">
button
    appearance: none
    display: flex
    align-items: center
    flex-shrink: 1
    flex-direction: column
    justify-content: center
    border: none
    background: none
    flex-basis: calc( 100% / 5 )
    cursor: pointer
    :slotted(svg)
        height: 20px
    span
        white-space: nowrap
</style>
