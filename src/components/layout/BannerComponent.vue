<template>
  <div class="top-controls">
    <div class="logo">
      <img src="@/assets/logo.png" />
      <span>medpoisk</span>
    </div>
  </div>
</template>

<style scoped>
.top-controls {
  flex-shrink: 0;
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.logo {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo img {
  width: 3rem;
  height: 3rem;
}

.logo span {
  font-size: 1.5rem;
}
</style>
