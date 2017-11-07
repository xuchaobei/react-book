export function getFormatDate(utc) {
  const date = new Date(utc);
  const year = date.getFullYear();
  let month = date.getMonth() + 1 + "";
  month = month.length === 1 ? "0" + month : month;
  let day = date.getDate() + "";
  day = day.length === 1 ? "0" + day : day;
  let hour = date.getHours() + "";
  hour = hour.length === 1 ? "0" + hour : hour;
  let minute = date.getMinutes() + "";
  minute = minute.length === 1 ? "0" + minute : minute;
  return `${year}-${month}-${day} ${hour}:${minute}`;
}