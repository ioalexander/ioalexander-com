<template>
  <div :class="$style.split">
    <slot />
  </div>
</template>

<style lang="scss" module>
.split {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-gap: 20px;
}
</style>
