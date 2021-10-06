import moment from 'moment';

export function layoverTime(dep: string, arr: string) {
  let start = moment(dep, 'HH:mm');
  let end = moment(arr, 'HH:mm');
  let diff = moment.duration(end.diff(start)).asMinutes();
  let time = `${moment.utc(diff * 60 * 1000).format('HH:mm')} hours`;
  return time;
}

export function dateFormatting(date: string) {
  let modifyTitle = date.split('/').reverse().join().replace(/,/g, '-');
  modifyTitle = moment(modifyTitle).format('ddd MMMM D, YYYY');
  modifyTitle =
    modifyTitle.toLowerCase() === 'invalid date' ? date : modifyTitle;
  return modifyTitle;
}

export function formatStandBy(dep: string, arr: string) {
  let depart_time = moment(dep, 'HH:mm:ss').format('HH:mm');
  let arr_time = moment(arr, 'HH:mm:ss').format('HH:mm');
  let time = `${depart_time} - ${arr_time}`;
  return time;
}

export function formatStandByForEventDetails(dep: string, arr: string) {
  let depart_time = moment(dep, 'HH:mm:ss').format('HH:mm');
  let arr_time = moment(arr, 'HH:mm:ss').format('HH:mm');
  return {depart_time, arr_time};
}
