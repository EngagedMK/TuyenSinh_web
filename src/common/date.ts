const formatDateDDMMYYY = (date: any, isUTC: boolean = true) => {
  const d = new Date(date + (isUTC ? "Z" : ""));
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

const formatDateTimeDDMMYYYYHHMM = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-GB", options).replace(",", "");
};

const formatDateUTC = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const timezoneOffset = -date.getTimezoneOffset() / 60;
  const timezone = `${timezoneOffset >= 0 ? "+" : "-"}${Math.abs(timezoneOffset)
    .toString()
    .padStart(2, "0")}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${timezone}`;
};
const convertUTCToLocalTime = (utcTime: string): string => {
  const date = new Date(utcTime);
  const localHours = date.getHours().toString().padStart(2, "0");
  const localMinutes = date.getMinutes().toString().padStart(2, "0");
  const localSeconds = date.getSeconds().toString().padStart(2, "0");
  return `${localHours}:${localMinutes}:${localSeconds}`;
};

const convertUTCToLocalDate = (utcDate: string) => {
  const date = new Date(utcDate);
  date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");
  return date;
};

const convertUTCtoLocal = (utcDateTime: any) => {
  const localDate = new Date(utcDateTime);
  // const localDate = new Date(
  //   utcDate.getTime() + utcDate.getTimezoneOffset() * 60000,
  // );

  const day = localDate.getDate();
  const month = localDate.getMonth() + 1;
  const year = localDate.getFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  return formattedDate;
};

const checkStringIsDateType = (dateString: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString))
    return false;
  const date = new Date(dateString);
  return date instanceof Date &&
    !isNaN(date.getTime()) &&
    date.toISOString() === dateString
    ? date
    : null;
};

export {
  formatDateUTC,
  formatDateDDMMYYY,
  convertUTCtoLocal,
  formatDateTimeDDMMYYYYHHMM,
  convertUTCToLocalTime,
  convertUTCToLocalDate,
  checkStringIsDateType,
};
