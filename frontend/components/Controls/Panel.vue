<template>
  <div :class="[$style.panel]">
    <slot />
  </div>
</template>

<style lang="scss" module>
.panel {
  background: var(--background-transparent);
  backdrop-filter: var(--background-blur);
  border: 1px solid var(--background-border);
}
</style>
