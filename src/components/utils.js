const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


export function convertTempInObj(obj, isCelcius) {
  for (let key in obj) {
    if (key === 'temp') {
      obj[key] = convertTemp(obj[key], isCelcius);
    } else if (typeof obj[key] === 'object') {
      convertTempInObj(obj[key], isCelcius);
    }
  }
  return obj;
}

export function convertTemp(kelvin, isCelcius) {
  return isCelcius ? Math.round(kelvin - 273.15) : Math.round((kelvin - 273.15) * 9 / 5 + 32)
}

export function convertTempArray(arr, isCelcius) {
  return arr.map((obj) => {
    return {
      ...obj,
      temp: isCelcius ? Math.round(obj.temp - 273.15) : Math.round((obj.temp - 273.15) * 9 / 5 + 32)
    };
  });
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
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
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours} ${ampm}`;
  return formattedTime;
}


