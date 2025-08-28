<template>
  <div :class="$style.layout">
    <Header />
    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.layout {
  width: 100%;

  .content {
    width: 100%;
  }
}
</style>
