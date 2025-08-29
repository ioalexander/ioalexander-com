<template>
  <div :class="$style.container">
    <header :class="$style.header">
      <ControlsPanel :class="$style.panel">
        <div :class="$style.content">
          <NuxtLink to="/" :class="$style.logo">
            <SvgLogo :class="$style.svg" />
          </NuxtLink>
          <div />
          <nav :class="$style.nav">
            <ul :class="$style.list">
              <li :class="$style.item">
                <NuxtLink :class="$style.link" to="/blog">Blog</NuxtLink>
              </li>
              <li :class="$style.item">
                <NuxtLink :class="$style.link" to="/find-me">Find me</NuxtLink>
              </li>
            </ul>
          </nav>
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
    z-index: 1000;

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
        grid-template-columns: 200px 1fr 200px;
        align-items: center;

        .nav {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          .list {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            list-style: none;

            .item {
              .link {
                padding: 10px;
                text-decoration: none;
              }
            }
          }
        }

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
