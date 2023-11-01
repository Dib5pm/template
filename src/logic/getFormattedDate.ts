export function getFormattedDate(date) {
  // Options to pass to toLocaleString to format the date as per your requirements
  const options = {
    weekday: 'long', // long-form weekday
    year: 'numeric', // numeric year
    month: 'long', // long-form month
    day: 'numeric', // numeric day
    hour: 'numeric', // numeric hour
    minute: '2-digit', // two-digit minute
  };

  // Get the formatted date string
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}