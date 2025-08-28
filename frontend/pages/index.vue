<template>
  <LandingSection :class="$style.hero">
    <LandingMaxWidth>
      <LandingSplit6040>
        <div :class="$style.left">
          <h1 :class="$style.title">
            Simple. Fast. <br />
            Built to Last.
          </h1>
          <p :class="$style.subtext">
            IOAlexander – I build fast, reliable, and scalable solutions for
            real-world impact
          </p>
          <div :class="$style.description">
            I help businesses ship reliable, scalable software faster:
            <ul>
              <li>
                High-performance backends that <b>grow with your business</b>
              </li>
              <li>
                Frontends engineered for speed, clarity, and <b>user impact</b>
              </li>
              <li>
                Solutions that <b>save</b> time, reduce errors, and deliver
                better experiences
              </li>
              <li>
                <b>Reliable</b> cloud infrastructure and DevOps pipelines for
                smooth deployment
              </li>
            </ul>
          </div>
        </div>
        <div :class="$style.right">
          <SvgHeroDiagram :class="$style.diagram" />
        </div>
      </LandingSplit6040>
    </LandingMaxWidth>
  </LandingSection>
</template>

<style lang="scss" module>
.hero .left {
  width: 100%;
  margin-top: 100px;
  margin-bottom: 100px;

  .title {
    font-size: 60px;
    margin-bottom: 10px;
    color: var(--text-secondary);
  }

  .subtext {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .description {
    font-size: 20px;

    ul {
      margin-left: 20px;
      margin-top: 10px;

      li {
        margin-bottom: 10px;
        b {
          color: var(--text-secondary);
        }
      }
    }
  }
}

.hero .right {
  width: 100%;
  position: relative;

  .diagram {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: auto;
    width: calc(100% + 200px);

    @media all and (max-width: 1700px) {
      width: calc(100% + 100px);
    }

    @media all and (max-width: 1500px) {
      width: 100%;
    }

    > * > *:nth-child(1) > *:nth-child(1),
    > * > *:nth-child(1) > *:nth-child(2),
    > * > *:nth-child(1) > *:nth-child(3),
    > * > *:nth-child(1) > *:nth-child(4),
    > * > *:nth-child(1) > *:nth-child(5),
    > * > *:nth-child(1) > *:nth-child(6),
    > * > *:nth-child(1) > *:nth-child(7),
    > * > *:nth-child(3),
    > * > *:nth-child(4) {
      transform-origin: center;
    }

    > * > *:nth-child(1) > *:nth-child(1) {
      animation: floaty-1 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(2) {
      animation: floaty-2 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(3) {
      animation: floaty-3 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(4) {
      animation: floaty-2 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(5) {
      animation: floaty-1 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(6) {
      animation: floaty-2 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(1) > *:nth-child(7) {
      animation: floaty-3 4s ease-in-out infinite alternate;
    }

    > * > *:nth-child(2) {
      animation: floaty-1 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(3) {
      animation: floaty-1 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(4) {
      animation: floaty-2 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(6) {
      animation: floaty-3 4s ease-in-out infinite alternate;
    }
    > * > *:nth-child(8) {
      animation: floaty-3 4s ease-in-out infinite alternate;
    }
    @keyframes floaty-1 {
      0%,
      100% {
        scale: 1;
        rotate: 0deg;
      }
      50% {
        scale: 1.02;
        rotate: 2deg;
      }
    }
    @keyframes floaty-2 {
      0%,
      100% {
        scale: 1;
        rotate: 0deg;
      }
      50% {
        scale: 0.98;
        rotate: -1.5deg;
      }
    }
    @keyframes floaty-3 {
      0%,
      100% {
        scale: 1;
        rotate: 0deg;
      }
      50% {
        scale: 1.01;
        rotate: 1deg;
      }
    }
  }
}
</style>
