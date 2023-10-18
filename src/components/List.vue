<script setup>
import ListItem from './ListItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <article class="panel is-primary">
    <!-- <p class="panel-tabs">
        <a class="is-active">All</a>
        <a>Public</a>
        <a>Private</a>
        <a>Sources</a>
        <a>Forks</a>
      </p> -->
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-primary" type="text" placeholder="Search">
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>

    <ListItem>
      <template #heading>Игла спинальная 26G (90 мм) Portex Пенсил с иглой-интродьюсером 20G</template>
      <template #amount>12</template>
      <template #min_amount>10</template>

    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной
        анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Игла спинальная (88мм) SURU для
        анестезии Квинке</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Медиагель - гель для УЗИ высокой
        вязкости бесцветный</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>

    <ListItem>
      <template #heading>Набор для спинально-эпидуральной
        анестезии Portex</template>
      <template #amount>12</template>
      <template #min_amount>10</template>
    </ListItem>
  </article>
</template>
