<template>
  <LandingSection :class="$style.callToAction">
    <LandingMaxWidth>
      <LandingCenter>
        <h2 :class="$style.title">
          Let’s build something fast and reliable together.
        </h2>
        <p :class="$style.subText">
          Whether you need a high-performance backend, a sleek frontend, or
          automated cloud workflows, I’m ready to help you ship faster, reduce
          errors, and scale with confidence. Reach out and let’s make it happen.
        </p>
        <LandingContactForm />
      </LandingCenter>
    </LandingMaxWidth>
  </LandingSection>
</template>

<style lang="scss" module>
.callToAction {
  margin-top: 20px;

  .title {
    font-size: 30px;
    color: var(--text-secondary);
    margin-bottom: 20px;
    text-align: center;
  }

  .subText {
    margin-bottom: 60px;
    text-align: center;
    max-width: 800px;
  }
}
</style>
