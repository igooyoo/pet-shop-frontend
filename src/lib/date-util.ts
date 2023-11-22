import moment from 'moment';

const parse = (date: string) => {
  if (date) return moment(date).format('YYYY/MM/DD-HH:mm');
  return '---';
};

const parseWithoutTime = (date: string) => {
  if (date) return moment(date).format('YYYY/MM/DD');
  return '---';
};

const fromNow = (date: string) => {
  if (date) return moment(date).fromNow();
  return '---';
};

export const DateUtil = {
  parse: (date: string) => parse(date),
  fromNow: (date: string) => fromNow(date),
  parseWithoutTime: (date: string) => parseWithoutTime(date),
};
