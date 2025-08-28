<template>
  <section :class="$style.section">
    <slot />
  </section>
</template>

<style lang="scss" module>
.section {
  width: 100%;
}
</style>
