<script setup>
// import WrenchIcon from '../components/icons/WrenchIcon.vue';
import { store } from '../store';
</script>

<!-- <template>
  <div class="container is-fluid is-multiline" style="padding-top: 10rem;">
    <div class="columns is-mobile is-centered">

      <div class="column is-half">
        <WrenchIcon style="display: block; height: 10rem; margin: auto;" />
      </div>

    </div>
    <div class="columns is-mobile is-centered" style="margin-top: 5rem;">
      <div class="content">
        <h3>&lt;501&gt;  Not Implemented</h3>
        <h3>ProfileView</h3>
      </div>
    </div>
  </div>
</template> -->

<template>
  <!-- <ion-list>
    <ion-item-sliding>
      <ion-item>
        <div class="box item" style="border: 1px solid black; width: 100%;">
          sdgsdfgsdfg
          <nav class="level is-mobile">
            <div class="level-left">
              <p class="level-item" aria-label="reply">
                12/12
              </p>
            </div>
            <div class="level-item">
              <button class="button is-small item-control">
                <CrossIcon />
              </button>
              <button class="button is-small item-control">
                <TrashIcon />
              </button>
            </div>
            <div class="level-right">
              <div class="content">
                <p class="place-tag" v-for="place in item.places" :key="place.id">
                  {{ place.title }}
                </p>
              </div>

            </div>
          </nav>
        </div>
      </ion-item>

      <ion-item-options>
        <ion-item-option>Favorite</ion-item-option>
        <ion-item-option color="danger">Delete</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">Archive</ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label>Sliding Item with Start Options</ion-label>
      </ion-item>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item-options side="start">
        <ion-item-option color="success">Archive</ion-item-option>
      </ion-item-options>

      <ion-item>
        <ion-label>Sliding Item with Options on Both Sides</ion-label>
      </ion-item>

      <ion-item-options side="end">
        <ion-item-option>Favorite</ion-item-option>
        <ion-item-option color="danger">Delete</ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list> -->
  <div>
    <!-- <p>list: {{ new_storage.list }}</p> -->
    <h1>list:</h1>
    <div v-for="item in store.list" :key="item.barcode">
      <p v-if="!item.basketed">{{ item }}
        <br /><button @click="item.basketed = true"> writeOff </button>
      </p>
    </div>
    <h1>basket:</h1>
    <div v-for="item in store.list" :key="item.barcode">
      <p v-if="item.basketed">{{ item }}
        <br><button @click="item.basketed = false"> restore </button>
      </p>
    </div>
    <h1>rooms:</h1>
    <div v-for="item in store.rooms" :key="item.number">
      <p>{{ item }}</p>
    </div>
    <h1>places:</h1>
    <div v-for="item in store.places" :key="item.title">
      <p>{{ item }}</p>
    </div>
    <h1>doctors:</h1>
    <div v-for="item in store.doctors" :key="item.name">
      <p>{{ item }}</p>
    </div>

    <button @click="store.move(store.list, store.basket, (a) => true)"> move </button>
    <button @click="store.move(store.basket, store.list, (a) => true)"> back </button>
    <button @click="store.drop(store.list, (a) => true)"> drop </button>
    <button @click="store.sync()"> sync </button>
    <button @click="store.sync_aux()"> sync_aux </button>


  </div>
</template>

<!-- <script lang="ts">
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList },
});
</script> -->