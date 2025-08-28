<template>
  <div :class="[$style.panel]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" module>
.panel {
  background: var(--background);
  filter: var(--shadow);
}
</style>
