<template>
  <div :class="$style.split">
    <slot />
  </div>
</template>

<style lang="scss" module>
.split {
  display: grid;
  grid-template-columns: 60% 40%;
  grid-gap: 20px;

  @media all and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
}
</style>
