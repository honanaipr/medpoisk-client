<script setup>
import List from '../components/List.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';
import router from '../router'
// import { ref } from 'vue';

// let incoiceList = ref([])

function btnAddOnClicked(){
    router.push({name: 'addToInvoice'})
}

</script>

<template>
    <InvoiceDataForm />
    <List :source="store.invoice"/>
    <div class="container is-fluid">
        <button class="button is-large is-fullwidth" @click="btnAddOnClicked">
            <PlusIcon />
        </button>
    </div>
</template>
