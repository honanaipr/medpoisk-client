<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import type { Allocation } from '@/stores/inventory_store'
import SelectComponent from './inputs/SelectComponent.vue'
import { useProductStore } from '@/stores/product_store'
import NumberInputVue from './inputs/NumberInput.vue'


defineProps({
    editable: { type: Boolean, default: true },
})

const allocations = defineModel('allocations', {
    type: Object as () => Allocation[], required: true
})

function addAllocation() {
    if (allocations.value.every(allocation => allocation.place && allocation.amount))
        allocations.value.push({
            place: null,
            amount: 0
        })
}
const productStore = useProductStore()
</script>

<template>
    <div class="product-allocator">
        <h1>Места хранения</h1>
        <div class="flex-col" v-if="editable">
            <div v-for="allocation in allocations" class="flex-row">
                <SelectComponent placeholder="" v-model="allocation.place" :options="productStore.products" />
                <NumberInputVue v-model="allocation.amount" />
            </div>
            <ButtonComponent @click="addAllocation" v-if="editable" has-border>+ Добавить место хранения</ButtonComponent>
        </div>
        <div class="flex-col" v-else>
            <div v-for="allocation in allocations" class="flex-row">
                <ButtonComponent>{{ allocation.place?.title || 'null' }} {{ allocation.place?.shortTitle || 'null' }}
                </ButtonComponent>
                <ButtonComponent>{{ allocation.amount }}</ButtonComponent>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
