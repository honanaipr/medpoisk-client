<script setup lang="ts">

defineProps(["isActive"])

const emit = defineEmits(['close'])

</script>

<template>
    <div class="menu-outer">
        <div class="menu-container">
            <div class="add-menu">
                <span @click="emit('close'); $router.push({ name: 'add' })">Наименование</span>
                <span @click="emit('close'); $router.push({ name: 'addInvoice' })">Накладная</span>
                <span>XLS файл</span>
                <span @click="emit('close'); $router.push({ name: 'addByCode' })">QR - код</span>
            </div>
        </div>
        <div class="background" @click="emit('close')"></div>
    </div>
</template>

<style scoped>
.menu-outer {
    height: 0;
    width: 100%;
    overflow: visible;
    position: relative
}

.menu-container {
    position: absolute;
    bottom: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 100%;
}

.add-menu {
    background-color: #F3F3F4;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #5A5A5C;
    background-color: F3F3F4;
    gap: 8px;
    padding: 8px 0 8px 0;
    font-family: 'Manrope', sans-serif;
    width: fit-content;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

span {
    display: block;
    padding: 8px 12px 8px 12px;
    cursor: pointer;
}
</style>

