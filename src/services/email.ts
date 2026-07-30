import { Resend } from "resend";

type SendContactEmailParams = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is not defined`);
  }

  return value;
}

const resendApiKey = getRequiredEnv("RESEND_API_KEY");
const contactEmail = getRequiredEnv("CONTACT_EMAIL");
const resendFromEmail = getRequiredEnv("RESEND_FROM_EMAIL");

const resend = new Resend(resendApiKey);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: SendContactEmailParams) {
  const normalizedSubject = normalizeSubject(subject);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(normalizedSubject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { data, error } = await resend.emails.send({
    from: resendFromEmail,
    to: [contactEmail],
    replyTo: email,
    subject: `Новое сообщение: ${normalizedSubject}`,
    html: `
      <div
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 32px;
          font-family: Arial, sans-serif;
          color: #111827;
        "
      >
        <h1 style="margin-bottom: 24px;">
          Новое сообщение с сайта-портфолио
        </h1>

        <p>
          <strong>Имя:</strong>
          ${safeName}
        </p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${safeEmail}">
            ${safeEmail}
          </a>
        </p>

        <p>
          <strong>Тема:</strong>
          ${safeSubject}
        </p>

        <div
          style="
            margin-top: 24px;
            padding: 20px;
            background-color: #f3f4f6;
            border-radius: 8px;
          "
        >
          <strong>Сообщение:</strong>

          <p style="margin-bottom: 0; line-height: 1.6;">
            ${safeMessage}
          </p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Не удалось отправить email: ${error.message}`);
  }

  if (!data) {
    throw new Error("Resend не вернул данные отправленного письма");
  }

  return data;
}