// import { useGlobalStore } from "@/store/global";
// import { setupAxiosInterceptors } from "../shared/config/axios-interceptor";
// import { Router } from "vue-router";
// import { ACCESS_LANGUAGE } from "./constants";
// import { checkGetLanguageLocalStorage } from "../shared/config/storage";

// export function initLibraryApp(router: Router, onRefreshToken: () => void) {
//   const globalStore = useGlobalStore();
//   const getLocalStorageLang = checkGetLanguageLocalStorage(ACCESS_LANGUAGE);
//   globalStore.UPDATE_CURRENT_LANGUAGE(getLocalStorageLang);

//   setupAxiosInterceptors(onRefreshToken, () => {
//     console.log("Unauthorized!");
//     globalStore.UPDATE_IS_AUTH(false);
//     localStorage.clear();
//     router.push("/login");
//   });
// }
