<template>
  <LandingSection
    :class="$style.whatIDo"
    ref="section"
    :style="{ opacity: sectionOpacity }"
  >
    <LandingMaxWidth>
      <LandingSplit4060>
        <div :class="$style.left">
          <div :class="$style.sticky">
            <ClientOnly>
              <img
                :class="$style.faceImage"
                src="/public/landing/linkedin_avatar.webp"
                alt="Linkedin Avatar"
              />
            </ClientOnly>
            <noscript>
              <p>
                No JavaScript enabled :(
                <NuxtLink to="#skipjsanchor">Click here to skip</NuxtLink>
              </p>
            </noscript>
          </div>
        </div>

        <div ref="rightRef" :class="$style.right">
          <div :class="$style.sticky" :offsetTop="300">
            <div :class="$style.steps">
              <ControlsPanel
                :class="$style.step"
                v-for="(step, index) in steps"
                :key="index"
                :style="stepStyles[index] as any"
              >
                <h2 :class="$style.title">{{ step.title }}</h2>
                <p
                  :class="$style.subText"
                  :style="{
                    height: stepStyles[index]?.textOpacity * 60 + 'px',
                    opacity: stepStyles[index]?.textOpacity,
                    overflow: 'hidden',
                    transition: stepStyles[index]?.transition,
                  }"
                >
                  {{ step.text }}
                </p>
              </ControlsPanel>
            </div>
          </div>
        </div>
      </LandingSplit4060>
    </LandingMaxWidth>
  </LandingSection>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const rightRef = ref<HTMLElement | null>(null);

const steps = [
  {
    title: "Backend Engineering",
    text: "Simple. Fast. Built to Last. IOAlexander – I build fast, reliable, and scalable solutions for real-world impact. I help businesses ship reliable, scalable software faster: High-performance backends that grow with you, Frontends engineered for speed and clarity, Solutions that save time and reduce errors, Reliable cloud infrastructure and DevOps",
  },
  {
    title: "Frontend Development",
    text: "Building clear, fast, and user-friendly interfaces. Using modern frameworks to deliver performant and maintainable frontends.",
  },
  {
    title: "DevOps & Cloud",
    text: "Designing reliable cloud infrastructure and automating deployment pipelines to save time and reduce human error.",
  },
  {
    title: "Automation",
    text: "Implementing automated workflows and scripts to speed up repetitive tasks, improve reliability, and reduce operational overhead.",
  },
];

const sectionOpacity = ref(1);
const scrollProgress = ref(0);
const stepStyles = ref<any[]>([]);

const getStepStyle = (index: number) => {
  const totalSteps = steps.length;
  const stepStart = index / totalSteps;
  const stepEnd = (index + 1) / totalSteps;
  const stepMiddleStart = stepStart + (stepEnd - stepStart) * 0.25;
  const stepMiddleEnd = stepEnd - (stepEnd - stepStart) * 0.25;

  const minScale = 0.4;
  let scale = minScale;
  let textOpacity = 0;

  if (scrollProgress.value < stepStart || scrollProgress.value > stepEnd) {
    scale = minScale;
    textOpacity = 0;
  } else if (scrollProgress.value < stepMiddleStart) {
    const t =
      (scrollProgress.value - stepStart) / (stepMiddleStart - stepStart);
    scale = minScale + (1 - minScale) * t;
    textOpacity = t;
  } else if (scrollProgress.value > stepMiddleEnd) {
    const t = (stepEnd - scrollProgress.value) / (stepEnd - stepMiddleEnd);
    scale = minScale + (1 - minScale) * t;
    textOpacity = t;
  } else {
    scale = 1;
    textOpacity = 1;
  }

  return {
    zIndex: scale === 1 ? 100 : 1,
    transform: `scale(${scale})`,
    opacity: scale,
    textOpacity,
    transition:
      "transform 0.1s cubic-bezier(0.4,0,0.2,1), opacity 0.1s ease-in-out",
  };
};

onMounted(() => {
  const rightEl = rightRef.value;
  if (!rightEl) return;

  const handleScroll = () => {
    const rect = rightEl.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    // scrollProgress: 0 when top of right hits top of viewport
    // 1 when bottom of right hits bottom of viewport
    const start = 0;
    const end = rect.height - viewHeight;
    const scrollY = window.scrollY;
    const topOfRight = scrollY + rect.top;
    scrollProgress.value = Math.min(
      1,
      Math.max(0, (scrollY - topOfRight) / end),
    );

    stepStyles.value = steps.map((_, index) => getStepStyle(index));

    // fade out after 90% scroll
    sectionOpacity.value =
      scrollProgress.value < 0.9
        ? 1
        : Math.max(0, 1 - (scrollProgress.value - 0.9) / 0.1);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
</script>

<style lang="scss" module>
.whatIDo {
  margin-top: 100px;
  transition: opacity 1s ease-in-out;

  .left,
  .right {
    position: relative;
    height: 3000px;

    .sticky {
      position: sticky;
      top: 300px;
    }
  }

  .left {
    height: auto;
    @media all and (max-width: 800px) {
      height: 200px;
    }
    .sticky {
      @media all and (max-width: 800px) {
        height: 100%;
        top: 0;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .faceImage {
      object-fit: contain;
      width: 100%;
      max-width: 400px;
      border-radius: 50%;
      overflow: hidden;
      top: 300px;

      @media all and (max-width: 800px) {
        top: 0;
        width: auto;
        height: 100%;
        margin: 0 auto;
      }
    }
  }

  .right {
    .steps {
      position: relative;
      .step {
        left: 0;
        right: 0;
        transform-origin: center center;
        padding: 16px;
        border-radius: 16px;
        filter: var(--blur);

        margin-bottom: 20px;

        .title {
          font-size: 30px;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
