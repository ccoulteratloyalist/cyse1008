import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------
// Helper function to convert Firestore Timestamp to JavaScript Date object
const timestampToDate = (timestamp) => {
  if (timestamp && typeof timestamp.toDate === 'function') {
    return timestamp.toDate();
  }
  return new Date(timestamp); // Fallback if it's already a date or date string
};

export function fDateISO(date, newFormat = 'dd MMM yyyy') {
  const dateObj = timestampToDate(date);
  return format(dateObj, newFormat);
}

export function fTimeISO(date, newFormat = 'p') {
  const dateObj = timestampToDate(date);
  return format(dateObj, newFormat);
}


export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fTime(date, newFormat) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function isBetween(inputDate, startDate, endDate) {
  const date = new Date(inputDate);

  const results =
    new Date(date.toDateString()) >= new Date(startDate.toDateString()) &&
    new Date(date.toDateString()) <= new Date(endDate.toDateString());

  return results;
}

export function isAfter(startDate, endDate) {
  const results =
    startDate && endDate ? new Date(startDate).getTime() > new Date(endDate).getTime() : false;

  return results;
}
