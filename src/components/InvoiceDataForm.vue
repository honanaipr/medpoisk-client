<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import { store } from '../store.js'
// const props = defineProps(['invoiceNumber', 'invoiceData'])
// const emit = defineEmits(['update:invoiceNumber', 'update:invoiceData'])


// const invoiceNumber = ref(null)
// const invoiceData = ref(null)
// const processedItems = ref(0)
// const totalItems = ref(0)

const heading = computed(() => {
    return "Накладная №" + (store.invoiceNumber || "?") + " от " + (store.invoiceData || "?")
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
                <input class="input" type="number" v-model="store.invoiceNumber" :class="{ 'is-danger': !store.invoiceNumber }">
            </div>
            <p class="help is-danger" v-if="!store.invoiceNumber">Поле необходимо</p>
        </div>

        <div class="field">
            <label class="label">Дата</label>
            <div class="control">
                <input class="input" type="date" v-model="store.invoiceData" format>
            </div>
        </div>

        <!-- <button class="button is-fullwidth" disabled> Обработанно позиций: {{ processedItems }}/{{ totalItems }}</button> -->
    </div>
</template>

<style scoped></style>