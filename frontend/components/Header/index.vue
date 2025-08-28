<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <ControlsPanel :class="$style.panel">
        <div :class="$style.content">
          <NuxtLink to="/" :class="$style.logo">
            <SvgLogo :class="$style.svg" />
          </NuxtLink>
        </div>
      </ControlsPanel>
    </header>
  </div>
</template>

<style lang="scss" module>
.container {
  width: 100%;
  height: 80px;

  .header {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
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

        display: grid;
        grid-template-columns: 200px 1fr 80px;
        align-items: center;

        .logo {
          width: 100%;
          height: 100%;

          .svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
