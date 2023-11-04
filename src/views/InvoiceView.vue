<script setup>
import List from '../components/ListComponent.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';
import router from '../router'
import InvoiceItem from '../components/InvoiceItem.vue'
import { ref } from 'vue';
import _ from 'lodash'

function btnAddOnClicked() {
    router.replace({ name: 'addToInvoice' })
}

function apply() {
    console.log("apply")
    store.invoice.forEach(element => {
        store.patchItem(element)
    });
    store.invoice = []
    router.replace({name: "home"})
}

function cancel() {
    router.replace({name:"home"})
    console.log("cancel")
}

const invoiceNumber = ref("")
const invoiceData = ref(new Date())

function allowApply() {
    return !!store.invoice.length && !!invoiceNumber.value && !!invoiceData.value
}

</script>

<template>
    <InvoiceDataForm v-model:invoice-data="invoiceData" v-model:invoice-number="invoiceNumber"/>
    <List :source="store.invoice" :item-component="InvoiceItem"/>
    <div class="container is-fluid">
        <div class="field is-grouped">
            <button class="button is-large is-fullwidth" @click="btnAddOnClicked">
                <PlusIcon />
            </button>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button" @click="apply()" :disabled="!allowApply()">Применить</button>
            </div>
            <div class="control">
                <button class="button" @click="cancel">Отменить</button>
            </div>
        </div>
    </div>
</template>
