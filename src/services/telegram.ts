type SendTelegramMessageParams = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type TelegramResponse = {
  ok: boolean;
  description?: string;
  result?: {
    message_id: number;
  };
};

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
}

function escapeTelegramHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function sendTelegramMessage({
  name,
  email,
  subject,
  message,
}: SendTelegramMessageParams) {
  const botToken = getRequiredEnv(
    "TELEGRAM_BOT_TOKEN",
  );

  const chatId = getRequiredEnv(
    "TELEGRAM_CHAT_ID",
  );

  const safeName = escapeTelegramHtml(name);
  const safeEmail = escapeTelegramHtml(email);
  const safeSubject =
    escapeTelegramHtml(subject);
  const safeMessage =
    escapeTelegramHtml(message);

  const text = `
<b>📩 Новое сообщение с сайта</b>

<b>Имя:</b> ${safeName}
<b>Email:</b> ${safeEmail}
<b>Тема:</b> ${safeSubject}

<b>Сообщение:</b>
${safeMessage}
  `.trim();

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
      cache: "no-store",
    },
  );

  const result =
    (await response.json()) as TelegramResponse;

  if (!response.ok || !result.ok) {
    throw new Error(
      result.description ||
        "Не удалось отправить сообщение в Telegram",
    );
  }

  return result.result;
}