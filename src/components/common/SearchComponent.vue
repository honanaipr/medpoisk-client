<script setup lang="ts">
import FilterIcon from '@/components/icons/FilterIcon.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue';
const serachQuery = defineModel<string>({required: true})
</script>

<template>
    <div class="search-container">
        <InputComponent style="margin-bottom: 0;" v-model="serachQuery" placeholder="Найти..."/>
        <ButtonComponent has-border><FilterIcon /></ButtonComponent>
    </div>
</template>

<style scoped lang="sass">
.search-container
    display: flex
    gap: 8px
svg
    box-sizing: border-box
    margin: 0.5rem
    width: calc(100% - 1rem)
    height: calc(100% - 1rem)
</style>