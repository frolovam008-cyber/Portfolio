import { NextResponse } from "next/server";

import { sendContactEmail } from "@/services/email";
import { supabaseAdmin } from "@/lib/supabase-server";
import { sendTelegramMessage } from "@/services/telegram";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as ContactRequestBody;

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const subject =
      typeof body.subject === "string"
        ? body.subject.trim()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Заполнены не все обязательные поля",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Сначала сохраняем сообщение в Supabase.
     * Только после успешного сохранения заявка
     * считается принятой.
     */
    const {
      data: savedMessage,
      error: insertError,
    } = await supabaseAdmin
      .from("contact_messages")
      .insert({
        name,
        email,
        subject,
        message,
      })
      .select("id")
      .single();

    if (insertError || !savedMessage) {
      console.error(
        "Supabase insert error:",
        insertError,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Не удалось сохранить сообщение",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * Email и Telegram запускаются одновременно.
     *
     * Promise.allSettled не выбрасывает общую ошибку,
     * если один из запросов завершился неудачно.
     */
    const [emailResult, telegramResult] =
      await Promise.allSettled([
        sendContactEmail({
          name,
          email,
          subject,
          message,
        }),

        sendTelegramMessage({
          name,
          email,
          subject,
          message,
        }),
      ]);

    const emailSent =
      emailResult.status === "fulfilled";

    const telegramSent =
      telegramResult.status === "fulfilled";

    if (emailResult.status === "rejected") {
      console.error(
        "Email notification error:",
        emailResult.reason,
      );
    }

    if (
      telegramResult.status === "rejected"
    ) {
      console.error(
        "Telegram notification error:",
        telegramResult.reason,
      );
    }

    /*
     * Сохраняем результаты отправки уведомлений.
     *
     * Ошибка этого обновления не отменяет заявку:
     * исходное сообщение уже сохранено в базе.
     */
    const { error: updateError } =
      await supabaseAdmin
        .from("contact_messages")
        .update({
          email_sent: emailSent,
          telegram_sent: telegramSent,
        })
        .eq("id", savedMessage.id);

    if (updateError) {
      console.error(
        "Supabase status update error:",
        updateError,
      );
    }

    /*
     * Возвращаем успех независимо от того,
     * отправились ли email и Telegram.
     *
     * Главный критерий успеха — сообщение
     * сохранено в Supabase.
     */
    return NextResponse.json(
      {
        success: true,
        messageId: savedMessage.id,
        emailSent,
        telegramSent,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/contact error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка сервера",
      },
      {
        status: 500,
      },
    );
  }
}



// import { NextResponse } from "next/server";

// import { supabaseAdmin } from "@/lib/supabase-server";
// import { sendContactEmail } from "@/services/email";

// type ContactRequestBody = {
//   name?: unknown;
//   email?: unknown;
//   subject?: unknown;
//   message?: unknown;
// };

// export async function POST(request: Request) {
//   console.log("POST /api/contact запущен");

//   try {
//     const body = (await request.json()) as ContactRequestBody;

//     const { name, email, subject, message } = body;

//     if (
//       typeof name !== "string" ||
//       typeof email !== "string" ||
//       typeof subject !== "string" ||
//       typeof message !== "string"
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Некорректный формат данных",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const normalizedData = {
//       name: name.trim(),
//       email: email.trim().toLowerCase(),
//       subject: subject.trim(),
//       message: message.trim(),
//     };

//     if (
//       !normalizedData.name ||
//       !normalizedData.email ||
//       !normalizedData.subject ||
//       !normalizedData.message
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Все поля обязательны",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     const { data: savedMessage, error: insertError } =
//       await supabaseAdmin
//         .from("contact_messages")
//         .insert({
//           name: normalizedData.name,
//           email: normalizedData.email,
//           subject: normalizedData.subject,
//           message: normalizedData.message,
//         })
//         .select("id, created_at")
//         .single();

//     if (insertError) {
//       console.error("Supabase insert error:", insertError);

//       return NextResponse.json(
//         {
//           success: false,
//           message: "Не удалось сохранить сообщение",
//         },
//         {
//           status: 500,
//         }
//       );
//     }

//     console.log("Сообщение сохранено:", savedMessage.id);
//     console.log("Перед вызовом sendContactEmail");

//     try {
//       const emailResult = await sendContactEmail(normalizedData);

//       console.log("Email отправлен:", emailResult);

//       const { error: updateError } = await supabaseAdmin
//         .from("contact_messages")
//         .update({
//           email_sent: true,
//         })
//         .eq("id", savedMessage.id);

//       if (updateError) {
//         console.error(
//           "Ошибка обновления email_sent:",
//           updateError
//         );
//       }

//       return NextResponse.json(
//         {
//           success: true,
//           emailSent: true,
//           message: "Сообщение сохранено и отправлено",
//           data: savedMessage,
//         },
//         {
//           status: 201,
//         }
//       );
//     } catch (emailError) {
//       console.error("Ошибка отправки email:", emailError);

//       return NextResponse.json(
//         {
//           success: true,
//           emailSent: false,
//           message:
//             "Сообщение сохранено, но email отправить не удалось",
//           data: savedMessage,
//         },
//         {
//           status: 201,
//         }
//       );
//     }
//   } catch (error) {
//     console.error("Contact API error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Внутренняя ошибка сервера",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }