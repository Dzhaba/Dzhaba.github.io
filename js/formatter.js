export function dateFormat(date) {
  let newDate = new Date(date);
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };
  return newDate.toLocaleString("en-US", options);
}

export function capitalizeFormat(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}