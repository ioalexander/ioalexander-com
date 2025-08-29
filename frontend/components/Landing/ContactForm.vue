<template>
  <form :class="$style.form" @submit.prevent="onSubmit()">
    <ControlsPanel :class="$style.panel">
      <div
        :class="{
          [$style.inputsScreen]: true,
          [$style.isShown]: !state.isFormSubmitted,
        }"
      >
        <div :class="$style.row">
          <ControlsInput
            v-model="state.form.firstName"
            label="First Name"
            required-asterisk
            :error="state.error.firstName"
          >
            <template #placeholder>E.g. John</template>
          </ControlsInput>
          <ControlsInput
            v-model="state.form.lastName"
            label="Last Name"
            required-asterisk
            :error="state.error.lastName"
          >
            <template #placeholder>E.g. Doe</template>
          </ControlsInput>
        </div>
        <div :class="$style.row">
          <ControlsInput
            v-model="state.form.email"
            label="E-mail address"
            required-asterisk
            :error="state.error.email"
          >
            <template #placeholder>E.g. johndoe@gmail.com</template>
          </ControlsInput>
          <ControlsInput
            v-model="state.form.phone"
            label="Phone Number"
            :error="state.error.phone"
          >
            <template #placeholder>E.g. +1 3004005000</template>
          </ControlsInput>
        </div>
        <ControlsSpacer :height="20" />
        <ControlsTextarea
          v-model="state.form.message"
          label="Message"
          :error="state.error.message"
          required-asterisk
        >
          <template #placeholder>
            Enter your message here... <br />* Do not forget to write your
            contact information!
          </template>
        </ControlsTextarea>
        <ControlsSpacer :height="20" />
        <ControlsTurnstile
          v-model="state.form.turnstile"
          :error="state.error.turnstile"
        />
        <ControlsSpacer :height="20" />
        <button :class="$style.submit" type="submit">Submit</button>
      </div>
      <div
        :class="{
          [$style.submittedScreen]: true,
          [$style.isShown]: state.isFormSubmitted,
        }"
      >
        <h3 :class="$style.title">Form submitted!</h3>
        <p :class="$style.subTitle">You will be contacted shortly</p>
      </div>
    </ControlsPanel>
  </form>
</template>

<script setup lang="ts">
import { emailRegex } from "~/shared/regex";

const state = reactive({
  form: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    turnstile: "",
  },
  error: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    turnstile: "",
  },
  isFormSubmitted: false,
  isSubmittingForm: false,
});

const api = useApi();

const onSubmit = async () => {
  if (state.isSubmittingForm) {
    return;
  }

  state.error.firstName = "";
  state.error.lastName = "";
  state.error.email = "";
  state.error.phone = "";
  state.error.message = "";
  state.error.turnstile = "";

  if (state.form.firstName.trim().length === 0) {
    state.error.firstName = "First name can't be empty!";
    return;
  }

  if (state.form.lastName.trim().length === 0) {
    state.error.lastName = "Last name can't be empty!";
    return;
  }

  if (state.form.email.trim().length === 0) {
    state.error.email = "E-mail can't be empty!";
    return;
  }

  if (!emailRegex.test(state.form.email)) {
    state.error.email = "E-mail is invalid!";
    return;
  }

  if (state.form.message.trim().length === 0) {
    state.error.message = "Message can't be empty";
    return;
  }

  if (state.form.turnstile.trim().length === 0) {
    state.error.turnstile = "Please verify with captcha";
    return;
  }

  state.isSubmittingForm = true;

  try {
    await api.form.submitContactForm(state.form);

    state.isFormSubmitted = true;
  } catch (e: unknown) {
    console.error("Failed to submit form:", e);
    let message = "Unknown";
    if (e instanceof Error) {
      message = e.message;
    }
  } finally {
    state.isSubmittingForm = false;
  }
};
</script>

<style lang="scss" module>
.form {
  width: 100%;
  max-width: 800px;

  .panel {
    padding: 32px;
    border-radius: 16px;

    .inputsScreen {
      opacity: 0;
      pointer-events: none;
      transition: 1s;

      &.isShown {
        opacity: 1;
        pointer-events: all;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;

        @media all and (max-width: 800px) {
          grid-template-columns: 1fr;
        }
      }

      .submit {
        padding: 0 32px;
        height: 48px;
        background: var(--color-accent);
        border-radius: 8px;
        border: none;
        color: var(--text-secondary);

        &:hover {
          filter: brightness(110%);
        }
      }
    }
  }

  .submittedScreen {
    opacity: 0;
    pointer-events: none;

    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    transition: 1s;

    &.isShown {
      opacity: 1;
      pointer-events: all;
    }

    .title {
      text-align: center;
      color: var(--text-secondary);
      font-size: 30px;
    }
    .subTitle {
      text-align: center;
    }
  }
}
</style>
