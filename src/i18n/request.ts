import { getRequestConfig } from "next-intl/server";

import en from "../app/messages/en.json";
import ru from "../app/messages/ru.json";

const messages = {
  en,
  ru,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale === "ru" || requestedLocale === "en"
      ? requestedLocale
      : "en";

  return {
    locale,
    messages: messages[locale],
  };
});


// import { getRequestConfig } from "next-intl/server";

// import en from "../app/messages/en.json";
// import ru from "../app/messages/ru.json";

// export default getRequestConfig(async ({ locale }) => {
//   const safeLocale = locale ?? "en";

//   return {
//     locale: safeLocale,
//     messages: {
//       en,
//       ru
//     }[safeLocale]
//   };
// });