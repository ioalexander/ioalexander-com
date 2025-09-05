<template>
  <LandingSection :class="$style.hero">
    <LandingMaxWidth>
      <LandingCenter>
        <div :class="$style.circle" />
        <h1 :class="$style.title">Let's connect!</h1>
        <nav :class="$style.buttons">
          <ul :class="$style.list">
            <li :class="$style.item">
              <NuxtLink
                to="https://www.linkedin.com/in/alexander-sudnik/?utm_source=ioalexandercom"
                :class="$style.link"
                >Linked-in</NuxtLink
              >
            </li>
            <li :class="$style.item">
              <NuxtLink
                to="https://github.com/ioalexander/"
                :class="$style.link"
                >GitHub</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </LandingCenter>
    </LandingMaxWidth>
  </LandingSection>
  <LandingSection :class="$style.formBlock">
    <LandingMaxWidth>
      <LandingCenter>
        <div :class="$style.circle" />
        <h2 :class="$style.title">Contact form:</h2>
        <ClientOnly>
          <template #fallback>
            <p>
              <br />
              Without JavaScript, Contact form will not work.
              <br />
              Please enable JavaScript
              <br />
            </p>
          </template>
          <LandingContactForm />
        </ClientOnly>
      </LandingCenter>
    </LandingMaxWidth>
  </LandingSection>
</template>

<script setup>
definePageMeta({
  title: "Find me",
  meta: [
    {
      name: "description",
      content:
        " Let’s build something fast and reliable together. Whether you need a high-performance backend, a sleek frontend, or automated cloud workflows, I’m ready to help you ship faster, reduce errors, and scale with confidence. Reach out and let’s make it happen. ",
    },
  ],
  client: false,
});
</script>

<style lang="scss" module>
.hero {
  position: relative;

  .circle {
    width: 800px;
    height: 800px;
    position: absolute;
    right: 50%;
    top: 0px;
    transform: translate(50%, -100%);
    background: var(--color-accent);
    border-radius: 100%;
    filter: blur(100px);
  }

  .title {
    margin-top: 100px;
    margin-bottom: 100px;
    text-align: center;
    font-size: 60px;
    color: var(--color-secondary);
  }
  .buttons {
    width: 100%;
    max-width: 500px;

    .list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      list-style: none;
      gap: 20px;

      .item {
        width: 100%;
        height: 48px;

        .link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: var(--color-accent);
          color: var(--color-secondary);
          text-decoration: none;
          border-radius: 8px;

          &:hover {
            filter: brightness(110%);
          }
        }
      }
    }
  }
}

.formBlock {
  position: relative;
  .circle {
    width: 800px;
    height: 800px;
    position: absolute;
    right: 50%;
    bottom: 0px;
    transform: translate(50%, 0);
    background: var(--color-accent);
    border-radius: 100%;
    filter: blur(100px);
    opacity: 0.05;
  }

  .title {
    margin-top: 200px;
    margin-bottom: 50px;
    text-align: center;
    font-size: 30px;
    color: var(--color-secondary);
  }
}
</style>
