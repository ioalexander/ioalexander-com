<template>
  <div>
    <label v-if="!!props.label" :class="$style.label"
      >{{ props.label
      }}<span v-if="props.requiredAsterisk" :class="$style.asterisk"
        >*</span
      ></label
    >
    <div :class="[$style.input]">
      <NuxtTurnstile :class="$style.turnstile" v-model="model" />
      <div v-if="isError" :class="$style.error">{{ props.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputRef = ref<HTMLInputElement | null>(null);

const props = defineProps({
  error: {
    type: String,
  },
  label: {
    type: String,
  },
  requiredAsterisk: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel<string>();

const isError = computed(() => !!props.error && props.error?.trim() !== "");
</script>

<style lang="scss" module>
.input {
  width: 100%;
  position: relative;

  .turnstile {
    height: 65px;
  }

  .error {
    margin-top: 10px;
    color: var(--color-status-error);
  }
}

.label {
  display: block;
  margin-top: 20px;
  margin-bottom: 10px;
  color: var(--text-secondary);
  font-size: 14px;

  .asterisk {
    font-size: 14px;
    color: var(--color-status-error);
    margin-left: 5px;
  }
}
</style>
