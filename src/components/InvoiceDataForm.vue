<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps(['invoiceNumber', 'invoiceData'])
const emit = defineEmits(['update:invoiceNumber', 'update:invoiceData'])


// const invoiceNumber = ref(null)
// const invoiceData = ref(null)
// const processedItems = ref(0)
// const totalItems = ref(0)

const heading = computed(() => {
    return "Накладная №" + (props.invoiceNumber || "?") + " от " + (props.invoiceData || "?")
})
</script>

<template>
    <div class="container is-fluid">
        <div class="content">
            <h1>{{ heading }}</h1>
        </div>
        <div class="field">
            <label class="label">Накладная №:</label>
            <div class="control">
                <input class="input" type="text" :value="invoiceNumber" @input="$emit('update:invoiceNumber', $event.target.value)">
            </div>
        </div>

        <div class="field">
            <label class="label">Накладная №:</label>
            <div class="control">
                <input class="input" type="date" :value="invoiceData" @input="$emit('update:invoiceData', $event.target.value)">
            </div>
        </div>

        <!-- <button class="button is-fullwidth" disabled> Обработанно позиций: {{ processedItems }}/{{ totalItems }}</button> -->
    </div>
</template>

<style scoped></style>