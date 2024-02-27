<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import type { InventoryJointItem } from '@/stores/inventory_store'


defineProps({
    editable: { type: Boolean, default: true },
})

const item = defineModel('item', {
    type: Object as () => InventoryJointItem, required: true
})

</script>

<template>
    <div class="product-allocator">
        <h1>Места хранения</h1>
        <div class="flex-col">
            <div v-for="allocation in item.allocations" class="flex-row">
                <ButtonComponent>{{ allocation.place.title }} {{ allocation.place.shortTitle }}</ButtonComponent>
                <ButtonComponent>{{ allocation.amount }}</ButtonComponent>
            </div>
            <ButtonComponent v-if="editable" has-border>+ Добавить место хранения</ButtonComponent>
        </div>
    </div>
</template>

<style scoped>
</style>
