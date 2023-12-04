<script setup>
import List from '../components/ListComponent.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';
import router from '../router'
import InvoiceItem from '../components/InvoiceItem.vue'

function btnAddOnClicked() {
    router.push({ name: 'addToInvoice' })
}

async function apply() {
    console.log("apply")
    store.invoice.forEach(async element => {
        await store.patchItem(element)
    });
    store.invoice = []
    router.push({name: "home"})
}

function cancel() {
    console.log("cancel")
    router.push({name:"home"})
}

// const invoiceNumber = ref("")
// const invoiceData = ref(new Date().toISOString().slice(0,10))

function allowApply() {
    return !!store.invoice.length && !!store.invoiceNumber && !!store.invoiceData
}

</script>

<template>
    <InvoiceDataForm/>
    <List :source="store.invoice" :item-component="InvoiceItem"/>
    <div class="container is-fluid">
        <div class="field is-grouped">
            <button class="button is-large is-fullwidth" @click="btnAddOnClicked">
                <PlusIcon width="30px"/>
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
