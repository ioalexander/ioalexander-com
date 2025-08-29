<template>
  <div :class="$style.layout">
    <Header />
    <div :class="$style.content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" module>
.layout {
  width: 100%;

  .content {
    width: 100%;
    min-height: 100vh;
  }
}
</style>
