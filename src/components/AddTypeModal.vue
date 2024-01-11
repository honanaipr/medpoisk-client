<script setup lang="ts">
import router from '../router';

defineProps(["isActive"])

const emit = defineEmits(['close'])

function btnAddSingleOnClick(){
    emit('close')
    router.push({name: 'add'})
}

function btnAddInvoiceOnClick(){
    emit('close')
    router.push({name: 'addInvoice'})
}

function btnAddByCodeOnClick(){
    emit('close')
    router.push({name: 'addByCode'})
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

<style scoped>
.modal-content {
    overflow: visible;
}
</style>

