<template>
  <footer :class="$style.footer">
    <ControlsPanel :class="$style.panel">
      <div :class="$style.content"></div>
    </ControlsPanel>
  </footer>
</template>

<style lang="scss" module>
.footer {
  margin-top: 100px;

  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  .panel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      max-width: var(--max-content-width);
      padding: 0 32px;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
