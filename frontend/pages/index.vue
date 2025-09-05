<template>
  <div>
    <BlockLandingHero />
    <BlockLandingWhatIDo />
    <BlockLandingCallToAction />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ client: false });
</script>

<style lang="scss" module>
.whatIDo {
  margin-top: 100px;
}
</style>
