<script setup>
import { ref } from 'vue'
import router from '../router';

defineProps(["isActive"])

const emit = defineEmits(['close'])

function btnAddSingleOnClick(){
    emit('close')
    router.replace({name: 'add'})
}

function btnAddInvoiceOnClick(){
    emit('close')
    router.replace({name: 'addInvoice'})
}

function btnAddByCodeOnClick(){
    emit('close')
    router.replace({name: 'addByCode'})
}

</script>

<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="buttons is-flex-direction-column">
                <button class="button is-large" @click="btnAddSingleOnClick">Добавить Наименование</button>
                <button class="button is-large" @click="btnAddInvoiceOnClick">Добавить накладную</button>
                <button class="button is-large" @click="btnAddByCodeOnClick">Сканировать код</button>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
    </div>
</template>

<style scoped></style>

