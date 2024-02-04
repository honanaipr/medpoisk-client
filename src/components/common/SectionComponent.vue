<template>
  <section class="section">
    <slot></slot>
  </section>
</template>

<style scoped lang="sass">
.section
  background-color: var(--background-seconfary)
  padding: 16px
  border-radius: 8px
  display: flex
  flex-direction: column
  gap: 16px
  font-size: 14px
  font-weight: 600
  color: var(--text-black)
</style>
