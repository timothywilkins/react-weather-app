export function convertTempToCel(kelvin, isCelcius) {
  if (isCelcius) {
    const celsius = kelvin - 273.15;
    return Math.round(celsius)
  }
  else {
    const fahrenheit = ((kelvin - 273.15) * 9 / 5 + 32)
    return Math.round(fahrenheit)
  }
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  const time = date.toLocaleTimeString();
  return `${dayOfWeek} ${time}`;
}

export function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return `${dayOfWeek}`;
}

export function convertToHours(timestamp) {
  var date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = date.getMinutes();
  return hours + ":00"
  // Seconds part from the timestamp
}

export function convertToMinutes(timestamp) {
  var date = new Date(timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = date.getMinutes();
  return hours + ":" + minutes
  // Seconds part from the timestamp
}
