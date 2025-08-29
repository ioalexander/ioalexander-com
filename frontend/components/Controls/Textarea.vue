<template>
  <div>
    <label v-if="!!props.label" :class="$style.label"
      >{{ props.label
      }}<span v-if="props.requiredAsterisk" :class="$style.asterisk"
        >*</span
      ></label
    >
    <div
      :class="[
        $style.input,
        {
          [$style.readonly]: props.readonly,
          [$style.isFocused]: state.isFocused,
        },
      ]"
    >
      <div
        v-if="!state.isPlaceholderHidden"
        :class="$style.placeholderContainer"
      >
        <slot name="placeholder" />
      </div>
      <div :class="$style.htmlInputContainer">
        <textarea
          ref="inputRef"
          :name="props.name"
          :class="$style.htmlInput"
          :rows="props.rows"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @keyup.enter="handleEnter"
        ></textarea>
      </div>
      <div v-if="isError" :class="$style.error">{{ props.error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const inputRef = ref<HTMLTextAreaElement | null>(null);

const emit = defineEmits(["focus", "blur", "enter"]);

const props = defineProps({
  name: String,
  error: String,
  readonly: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  label: {
    type: String,
  },
  requiredAsterisk: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel<string>();

const state = reactive({
  isFocused: false,
  isPlaceholderHidden: false,
  isFilled: false,
});

const isError = computed(() => !!props.error && props.error.trim() !== "");

const handleFocus = () => {
  state.isFocused = true;
  state.isPlaceholderHidden = true;
  emit("focus");
};

const handleBlur = () => {
  state.isFocused = false;
  if (!state.isFilled) state.isPlaceholderHidden = false;
  emit("blur");
};

const handleInput = (e: any) => {
  model.value = e.target?.value;
  state.isFilled = inputRef?.value?.value?.length !== 0;
  state.isPlaceholderHidden = state.isFilled;
};

const handleEnter = () => emit("enter");

const setValue = (value: string) => {
  if (!inputRef?.value) return;
  inputRef.value.value = value;
};

onMounted(() => {
  const existingValue = inputRef?.value?.value;
  state.isFilled = existingValue?.length !== 0;
  state.isPlaceholderHidden = state.isFilled;
  model.value = existingValue;
});

defineExpose({ setValue });
</script>

<style lang="scss" module>
.input {
  width: 100%;
  position: relative;

  &.readonly {
    pointer-events: none;
  }

  &.isFocused {
    .htmlInputContainer {
      border: 1px solid var(--color-accent);
    }
  }

  .placeholderContainer {
    position: absolute;
    left: 18px;
    top: 15px;
    pointer-events: none;
    color: var(--gray-800);
    width: calc(100% - 18px - 18px);
    color: var(--text-placeholder);
  }

  .htmlInputContainer {
    width: 100%;
    border-radius: 8px;
    background: var(--background-transparent);
    border: 1px solid var(--background-border);

    .htmlInput {
      width: 100%;
      height: 100%;
      padding: 8px 16px;
      resize: vertical;
      background: none;
      min-height: 100px;
      outline: none;
    }
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
