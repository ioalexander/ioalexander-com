<template>
  <div :class="$style.maxWidth">
    <slot />
  </div>
</template>
<style lang="scss" module>
.maxWidth {
  max-width: var(--max-content-width);
  margin: 0 auto;
  padding: 0 32px;
  width: 100%;
}
</style>
