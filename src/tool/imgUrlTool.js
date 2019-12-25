

const isDev = process.env.NODE_ENV === 'development';
const host = isDev ? 'http://oss.weilaicheng.com/' : 'http://p.oss.kuaipeilian.com/';

export function imageAddressProcessing(urlStr) {
  return `${host}${urlStr}`;
}
