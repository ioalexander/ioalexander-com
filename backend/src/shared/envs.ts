import "dotenv/config";

export const envs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  APP_DOMAIN: process.env.APP_DOMAIN,

  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,

  IS_TESTING: process.env.NODE_ENV === `test`,

  TELEGRAM_NOTIFICATIONS_BOT_TOKEN:
    process.env.TELEGRAM_NOTIFICATIONS_BOT_TOKEN,
  TELEGRAM_NOTIFICATIONS_CHAT_ID: process.env.TELEGRAM_NOTIFICATIONS_CHAT_ID,
};
