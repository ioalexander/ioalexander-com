<template>
  <footer :class="$style.footer">
    <ControlsPanel :class="$style.panel">
      <div :class="$style.content">
        <NuxtLink to="/" :class="$style.logo" aria-label="IOAlexander Home">
          <SvgLogo :class="$style.svg" />
        </NuxtLink>
        <nav :class="$style.nav">
          <ul :class="$style.list">
            <li :class="$style.item">
              <NuxtLink to="/blog" :class="$style.url">Blog</NuxtLink>
            </li>
            <li :class="$style.item">
              <NuxtLink to="/find-me" :class="$style.url">Find me</NuxtLink>
            </li>
          </ul>
        </nav>
        <nav :class="$style.nav">
          <ul :class="$style.list">
            <li :class="$style.item">
              <NuxtLink to="https://github.com/ioalexander/" :class="$style.url"
                >GitHub</NuxtLink
              >
            </li>
            <li :class="$style.item">
              <NuxtLink
                to="https://www.linkedin.com/in/alexander-sudnik/?utm_source=ioalexandercom"
                :class="$style.url"
                >Linked-in</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </ControlsPanel>
  </footer>
</template>

<style lang="scss" module>
.footer {
  margin-top: 100px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .panel {
    width: 100%;
    padding-top: 32px;
    padding-bottom: 100px;

    display: flex;
    justify-content: center;
    align-items: center;

    .content {
      max-width: var(--max-content-width);
      padding: 0 32px;
      height: 100%;
      width: 100%;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;

      @media all and (max-width: 800px) {
        grid-template-columns: 1fr;
      }

      .logo {
        width: 200px;
        .svg {
          width: 100%;
          height: auto;
        }
      }

      .nav {
        .list {
          list-style: none;
          margin-left: 32px;

          .item {
            margin-bottom: 16px;

            .url {
              text-decoration: none;
              &:hover {
                color: var(--text-secondary);
              }
            }
          }
        }
      }
    }
  }
}
</style>
