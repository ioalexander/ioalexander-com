<template>
  <div :class="$style.center">
    <slot />
  </div>
</template>

<style lang="scss" module>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
