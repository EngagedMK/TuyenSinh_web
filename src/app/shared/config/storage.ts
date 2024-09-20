import { AES, enc } from "crypto-js";
import { KEY_LOCAL } from "../../core/constants";
import { ELanguage } from "../enums/ELanguage";

const encrypt = (txt: string) => {
  return txt ? AES.encrypt(JSON.stringify(txt), KEY_LOCAL).toString() : "";
};

const decrypt = (txtToDecrypt: string | null) => {
  try {
    const decode = txtToDecrypt
      ? JSON.parse(AES.decrypt(txtToDecrypt, KEY_LOCAL).toString(enc.Utf8))
      : "";
    return decode + "";
  } catch {
    return "";
  }
};

const manipulateLocalStorage = () => {
  Storage.prototype.setEncryptedItem = (key: string, value: string) => {
    localStorage.setItem(key, encrypt(value) ?? "");
  };

  Storage.prototype.getDecryptedItem = (key: string) => {
    const data = localStorage.getItem(key) || "";
    return decrypt(data) || null;
  };
};

const checkGetLanguageLocalStorage = (key: string) => {
  const getLocalStorageLang = localStorage.getItem(key) as ELanguage;
  if (Object.values(ELanguage).includes(getLocalStorageLang)) {
    return getLocalStorageLang as ELanguage;
  } else {
    return ELanguage.Vi;
  }
};

export {
  encrypt,
  decrypt,
  manipulateLocalStorage,
  checkGetLanguageLocalStorage,
};
