// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
// export const DEBUG_INFO_ENABLED: boolean = !!process.env.DEBUG_INFO_ENABLED;
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const KEY_LOCAL: string =
  import.meta.env.VITE_KEY_STORAGE || "KEY_LOCAL";
// export const ACCESS_TOKEN_NAME: string =
//   import.meta.env.ACCESS_TOKEN_NAME || "bpmc-admin-accessToken";
// export const REFRESH_TOKEN_NAME: string =
//   import.meta.env.REFRESH_TOKEN_NAME || "bpmc-admin-refreshToken";
export const CURRENT_LANGUAGE: string =
  import.meta.env.CURRENT_LANGUAGE || "currentLanguage";
export const ACCESS_LANGUAGE: string =
  import.meta.env.ACCESS_LANGUAGE || "Accept-Language";
export const APP_NAME: string = "eUni Đào Tạo Sinh Viên";
