<script setup lang="ts">
defineProps({
    title: { type: String, default: "Название поля" },
    description: { tytle: String, default: "Описание поля" }
})

const model = defineModel()
</script>


<template>
    <span v-if="title">{{ title }}</span>
    <input v-model="model" type="text" placeholder="default" id="name" name="name" />
    <span v-if="description">{{ description }}</span>
</template>

<style scoped lang="sass">
input
    background-color: #F3F3F4
    border: 1px solid #999999
    padding: 10px
    border-radius: 8px
    font-weight: 700
    width: 100%
    color: #5A5A5C
span
    display: block
    font-size: 12px
    font-weight: 600
    color: #5A5A5C
</style>