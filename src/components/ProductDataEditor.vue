<script setup lang="ts">
import InputComponent from '@/components/inputs/InputComponent.vue'
import type { InventoryJointItem } from '@/stores/inventory_store'
import { watch } from 'vue';

const props = defineProps({
    editable: { type: Boolean, default: true },
})

const item = defineModel('item', {
    type: Object as () => InventoryJointItem, required: true
})
async function apply() {

}

const fullfilled = defineModel('fullfilled', {
    type: Boolean, required: true
})

watch(item, ()=>{
    if (item)
    fullfilled .value = true
})


</script>

<template>
    <div class="inventory-edit">

        <h1>Изображение</h1>
        <!-- <ImageSelector :disabled="!editable" v-model:imageFile="imageFile" /> -->
        <InputComponent :disabled="!editable" title="Наименование" placeholder="Аспирин" v-model="item.product.title">
        </InputComponent>
        <h1>Параметры наименования</h1>
        <div class="flex-col small-gap">
            <div class="flex-row small-gap">
                <InputComponent :disabled="!editable" title="Количество" placeholder="4" v-model="item.limit">
                </InputComponent>
                <InputComponent :disabled="!editable" title="Неснижаемый остаток" placeholder="4" v-model="item.limit">
                </InputComponent>
            </div>
            <div class="flex-row small-gap">
                <InputComponent :disabled="!editable" title="Цена за шт." placeholder="4" v-model="item.limit">
                </InputComponent>
                <InputComponent :disabled="!editable" title="Сумма" placeholder="4" v-model="item.limit"></InputComponent>
            </div>
        </div>
        <InputComponent :disabled="!editable" title="Штрихкод" placeholder="987654321098" v-model="item.product.barcode">
        </InputComponent>
    </div>
</template>

<style scoped>
.small-gap {
    gap: 8px
}

.no-grow {
    flex-grow: 0;
}

div.inventory-edit {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 10px;
}
 .uploadFile {
   display: none;
 }

 #uploadIcon {
   cursor: pointer;
 }
 svg {
   width: 20px;
 }
div.buttons {
    gap: 8px;
}</style>
