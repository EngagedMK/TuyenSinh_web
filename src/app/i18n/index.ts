// import { createI18n } from "vue-i18n";
// import { ACCESS_LANGUAGE } from "../core/constants";
// import { ELanguage } from "../shared/enums/ELanguage";
// import { checkGetLanguageLocalStorage } from "../shared/config/storage";

// const getLocalStorageLang = checkGetLanguageLocalStorage(ACCESS_LANGUAGE);

// const fileNameToLocaleModuleDict = import.meta.glob<{
//   default: Record<string, string>;
// }>("./locales/*.json", {
//   eager: true,
// });

// const messages: { [P: string]: Record<string, string> } = {};
// Object.entries(fileNameToLocaleModuleDict)
//   .map(([fileName, localeModule]) => {
//     const fileNameParts = fileName.split("/");
//     const fileNameWithoutPath = fileNameParts[fileNameParts.length - 1];
//     const localeName = fileNameWithoutPath.split(".json")[0];

//     return [localeName, localeModule.default] as const;
//   })
//   .forEach((localeNameLocaleMessagesTuple) => {
//     messages[localeNameLocaleMessagesTuple[0]] =
//       localeNameLocaleMessagesTuple[1];
//   });

// export default createI18n({
//   legacy: false,
//   locale: getLocalStorageLang ?? "",
//   fallbackLocale: ELanguage.Vi,
//   messages,
// });
