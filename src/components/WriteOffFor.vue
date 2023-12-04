<script setup>
import { store } from '../store.js'

defineProps(['room_id', 'doctor_id', 'allow_apply'])
defineEmits(['update:room_id', 'update:doctor_id', 'apply', 'cancel'])
// defineProps({
//     room_id: {
//         default: ""
//     },
//     doctor_id: {
//         default: ""
//     },
//     allow_apply: {

//     }
// })
</script>

<template>
    <div class="container is-fluid">
        <div class="box item">
            <div class="field">
                <label class="label">Врач:</label>
                <div class="control">
                    <div class="select is-fullwidth">
                        <select :value="doctor_id" @input="$emit('update:doctor_id', $event.target.value)">
                            <option disabled value="">Выбрать врача</option>
                            <option v-for="doctor in store.doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="label">Кабинет:</label>
                <div class="control">
                    <div class="select is-fullwidth" :class="{ 'is-danger': !room_id }">
                        <select :value="room_id" @input="$emit('update:room_id', $event.target.value)">
                            <option disabled value="">Выбрать кабинет</option>
                            <option v-for="room in store.rooms" :key="room.id" :value="room.id">{{ room.number }}
                            </option>
                        </select>
                    </div>
                </div>
                <p class="help is-danger" v-if="!room_id">Поле необходимо</p>
            </div>
        </div>
        <div class="buttons is-fullwidth">
            <button class="button is-fullwidth is-danger is-light" style="border-color: black;"
                @click="$emit('cancel')">Отменить</button>
            <button class="button is-fullwidth is-primary is-light" style="border-color: black;" @click="$emit('apply')"
                :disabled="!(!!room_id && allow_apply)">Списать</button>
        </div>
    </div>
</template>

<style scoped>
.item {
    margin-bottom: 0.5rem;
    border: 1px solid black;
    padding: 0.5rem;
    border-radius: 5px;
}

.item-control {
    width: 5rem;
}

p.place-tag {
    margin-bottom: 0;
}
</style>
