<script setup lang="ts">
import FilterIcon from '@/components/icons/FilterIcon.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue';
const serachQuery = defineModel<string>({required: true})
</script>

<template>
    <div class="search-container">
        <InputComponent v-model="serachQuery" placeholder="Найти..."/>
        <ButtonComponent class="button" has-border><FilterIcon /></ButtonComponent>
    </div>
</template>

<style scoped lang="sass">
.search-container
    display: flex
    gap: 8px
.button
    padding: 16px
    width: fit-content
    flex-grow: 0
</style>