// import {
//   ACCESS_LANGUAGE,
//   ACCESS_TOKEN_NAME,
//   BASE_API_URL,
//   EDU_SOFT,
//   REFRESH_TOKEN_NAME,
// } from "@/app/core/constants";
// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
// import { EResultCode } from "../enums/EResultCode";
// import jwtDecode, { JwtPayload } from "jwt-decode";
// import { checkGetLanguageLocalStorage, decrypt } from "./storage";
// import { ELanguage } from "../enums/ELanguage";
// const TIMEOUT = 1000000;
// axios.defaults.timeout = TIMEOUT;
// axios.defaults.baseURL = BASE_API_URL;

// const onRequestSuccess = (config: InternalAxiosRequestConfig<any>) => {
//   let languagetoLocalStorage: ELanguage;
//   const tokenEncode =
//     localStorage.getItem(ACCESS_TOKEN_NAME) ||
//     sessionStorage.getItem(ACCESS_TOKEN_NAME);

//   try {
//     languagetoLocalStorage = checkGetLanguageLocalStorage(ACCESS_LANGUAGE);
//   } catch (error) {
//     console.error("Error retrieving language from localStorage:", error);
//     languagetoLocalStorage = ELanguage.Vi;
//   }

//   config.headers[ACCESS_LANGUAGE] = languagetoLocalStorage;

//   const token = decrypt(tokenEncode ?? "");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   if (config.url === `${EDU_SOFT}/auth/token`) {
//     const refreshTokenEndcode =
//       localStorage.getItem(REFRESH_TOKEN_NAME) ||
//       sessionStorage.getItem(REFRESH_TOKEN_NAME);
//     const refreshToken = decrypt(refreshTokenEndcode);
//     config.headers.refreshToken = refreshToken;
//   }
//   return config;
// };

// const setupAxiosInterceptors = (
//   onRefreshToken: () => void,
//   onUnauthenticated: () => void,
// ) => {
//   const onResponseError = async (err: AxiosError) => {
//     const status = err.status || err.response?.status;
//     const config = err.config!;
//     config.url = config.url?.replace(`${BASE_API_URL}`, "");
//     const tokenEncode =
//       localStorage.getItem(ACCESS_TOKEN_NAME) ||
//       sessionStorage.getItem(ACCESS_TOKEN_NAME);
//     const token = decrypt(tokenEncode);
//     const refreshTokenEncode =
//       localStorage.getItem(REFRESH_TOKEN_NAME) ||
//       sessionStorage.getItem(REFRESH_TOKEN_NAME);
//     const refreshToken = decrypt(refreshTokenEncode);
//     if (!refreshToken) {
//       onUnauthenticated();
//       return Promise.reject();
//     }
//     if (status === EResultCode.UNAUTHORIZED && !checkTokenValidity(token)) {
//       await onRefreshToken();
//       return await axios.request(config);
//     } else if (status === EResultCode.FORBIDDEN) {
//       onUnauthenticated();
//     }

//     return Promise.reject(err);
//   };
//   if (axios.interceptors) {
//     axios.interceptors.request.use(onRequestSuccess);
//     axios.interceptors.response.use((res) => res, onResponseError);
//   }
//   axios.interceptors.request.use((config) => {
//     return config;
//   });
// };

// function checkTokenValidity(token: string) {
//   if (token) {
//     const decodedToken = jwtDecode<JwtPayload>(token);
//     console.log(decodedToken);

//     return (
//       decodedToken &&
//       decodedToken.exp &&
//       decodedToken.exp * 1000 > new Date().getTime()
//     );
//   }
//   return false;
// }

// export { onRequestSuccess, setupAxiosInterceptors };
