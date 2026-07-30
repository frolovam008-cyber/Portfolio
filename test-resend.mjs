import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY
  ?.replace(/[\u200B-\u200D\uFEFF]/g, "")
  .trim();
  
console.log({
  keyPrefix: apiKey?.slice(0, 3),
  keyLength: apiKey?.length,
});

const resend = new Resend(apiKey);

const result = await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "frolovam008@gmail.com",
  subject: "Resend local test",
  html: "<p>Локальная отправка Resend работает</p>",
});

console.log(result);