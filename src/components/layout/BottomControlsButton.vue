<script setup lang="ts">
defineProps(['title', 'active'])
</script>

<template>
  <button>
    <slot name="icon"></slot>
    <span :class="active ? 'active' : ''">{{ title }}</span>
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
        font-size: 8px
        white-space: nowrap
span.active
    color: var(--active-color, black)
span
    color: var(--color-grey, grey)
</style>
