<template>
    <div class="content has-content-centered empty-hint">
      <h1>
        <slot name="empty_caption">Здесь ничего нет</slot>
      </h1>
    </div>
</template>
<style scoped lang="sass">
.empty-hint
    margin-top: 1rem
</style>