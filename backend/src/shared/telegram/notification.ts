import axios from "axios";
import { envs } from "../envs";

export const sendTelegramNotification = (message: string) => {
  try {
    const token = envs.TELEGRAM_NOTIFICATIONS_BOT_TOKEN;
    const chatId = envs.TELEGRAM_NOTIFICATIONS_CHAT_ID;

    if (!token) {
      console.warn("No telegram bot token");
      return;
    }

    if (!chatId) {
      console.warn("No telegram chat id");
      return;
    }

    const safeMessage = message.replace(/([_\\[\]()~>#+\-=|{}.!])/g, "\\$1");

    axios
      .post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id: chatId,
        text: safeMessage,
        parse_mode: "MarkdownV2",
      })
      .catch((e) =>
        console.error("Failed to send telegram notification", e?.message),
      );
  } catch (e) {
    console.error("Failed to send telegram notification", e?.message);
    return;
  }
};
