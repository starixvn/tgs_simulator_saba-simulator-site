export const formatCurrentDateTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const timezoneOffset = -4 * 60 * 60 * 1000;
  const dateInTargetTimezone = new Date(utc + timezoneOffset);
  const pad = (num) => String(num).padStart(2, "0");
  const year = dateInTargetTimezone.getFullYear();
  const month = pad(dateInTargetTimezone.getMonth() + 1);
  const day = pad(dateInTargetTimezone.getDate());
  const hours = pad(dateInTargetTimezone.getHours());
  const minutes = pad(dateInTargetTimezone.getMinutes());
  const seconds = pad(dateInTargetTimezone.getSeconds());
  const milliseconds = String(dateInTargetTimezone.getMilliseconds()).padStart(
    3,
    "0"
  );
  const timezone = "-04:00";
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezone}`;
};

export const formatCurrentDate = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const timezoneOffset = -4 * 60 * 60 * 1000;
  const dateInTargetTimezone = new Date(utc + timezoneOffset);

  const pad = (num) => String(num).padStart(2, "0");
  const year = dateInTargetTimezone.getFullYear();
  const month = pad(dateInTargetTimezone.getMonth() + 1);
  const day = pad(dateInTargetTimezone.getDate());

  return `${year}-${month}-${day}T00:00:00.000-04:00`;
};

