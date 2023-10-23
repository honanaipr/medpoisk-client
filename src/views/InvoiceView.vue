<script setup>
import List from '../components/List.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';
import { ref } from 'vue';

let incoiceList = ref([])

</script>

<template>
    <InvoiceDataForm />
    <List :source="incoiceList" />

    <button class="button is-large is-fullwidth">
        <PlusIcon />
    </button>
</template>
