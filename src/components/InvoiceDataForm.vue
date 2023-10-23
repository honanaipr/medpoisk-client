<script setup>
import { ref, computed } from 'vue';

const invoiceNumber = ref(null)
const invoiceData = ref(null)
const processedItems = ref(0)
const totalItems = ref(0)

const heading = computed(() => {
    return "Накладная №" + (invoiceNumber.value || "?") + " от " + (invoiceData.value || "?")
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
                <input class="input" type="text" v-model="invoiceNumber">
            </div>
        </div>

        <div class="field">
            <label class="label">Накладная №:</label>
            <div class="control">
                <input class="input" type="date" v-model="invoiceData">
            </div>
        </div>

        <button class="button is-fullwidth" disabled> Обработанно позиций: {{ processedItems }}/{{ totalItems }}</button>
    </div>
</template>

<style scoped></style>