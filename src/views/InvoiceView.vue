<script setup>
import List from '../components/ListComponent.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue';
import InvoiceDataForm from '../components/InvoiceDataForm.vue';
import router from '../router'
import ListItem from '../components/ListItem.vue';

function btnAddOnClicked() {
    router.replace({ name: 'addToInvoice' })
}

function apply() {
    console.log("apply")
}

function cancel() {
    router.go(-1)
    console.log("apply")
}

</script>

<template>
    <InvoiceDataForm />
    <List :source="store.invoice" :item-component="ListItem"/>
    <div class="container is-fluid">
        <div class="field is-grouped">
            <button class="button is-large is-fullwidth" @click="btnAddOnClicked">
                <PlusIcon />
            </button>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <button class="button" @click="apply()" :disabled="!store.invoice.length">Применить</button>
            </div>
            <div class="control">
                <button class="button" @click="cancel">Отменить</button>
            </div>
        </div>
    </div>
</template>
