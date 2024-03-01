<script setup lang="ts">
import InputComponent from '@/components/inputs/InputComponent.vue'
import type { InventoryJointItem } from '@/stores/inventory_store'
import ImageSelector from './inputs/ImageSelector.vue';

const props = defineProps({
    editable: { type: Boolean, default: true },
})

const imageFile = defineModel('imageFile', {
    type: File, required: false
})

const productTitle = defineModel('productTitle', {
    type: String, required: true
})

const productLimit = defineModel('productLimit', {
    type: Number, required: true
})

const productBarcode = defineModel('productBarcode', {
    type: Number, required: true
})

const productPrice = defineModel('productPrice', {
    type: Number, required: true
})

const productAmount = defineModel('productAmount', {
    type: Number, required: true
})

</script>

<template>
    <div class="inventory-edit">

        <h1>Изображение</h1>
        <ImageSelector :disabled="!editable" v-model:imageFile="imageFile" />
        <InputComponent :disabled="!editable" title="Наименование" placeholder="Аспирин" v-model="productTitle">
        </InputComponent>
        <h1>Параметры наименования</h1>
        <div class="flex-col small-gap">
            <div class="flex-row small-gap">
                <InputComponent :disabled="!editable" title="Количество" placeholder="4" v-model="productAmount">
                </InputComponent>
                <InputComponent :disabled="!editable" title="Неснижаемый остаток" placeholder="4" v-model="productLimit">
                </InputComponent>
            </div>
            <div class="flex-row small-gap">
                <InputComponent :disabled="!editable" title="Цена за шт." placeholder="4" v-model="productPrice">
                </InputComponent>
                <InputComponent :disabled="true" title="Сумма" placeholder="4" :value="productAmount * productPrice"></InputComponent>
            </div>
        </div>
        <InputComponent :disabled="!editable" title="Штрихкод" placeholder="987654321098" v-model="productBarcode">
        </InputComponent>
    </div>
</template>

<style scoped>
div.inventory-edit {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 10px;
}

</style>
