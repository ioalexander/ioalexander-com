<template>
  <div :class="$style.layout">
    <Header />
    <div :class="$style.content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" module>
.layout {
  width: 100%;

  .content {
    width: 100%;
  }
}
</style>
