function getCookieWithName(name) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${name}=`);
    // 如果document.cookie对象里面有cookie则查找是否有指定的cookie，如果有则返回指定的cookie值，如果没有则返回空字符串
    if (cStart !== -1) {
      cStart = cStart + name.length + 1;
      let cEnd = document.cookie.indexOf(';', cStart);
      if (cEnd === -1) {
        cEnd = document.cookie.length;
      }
      return unescape(document.cookie.substring(cStart, cEnd));
    }
  }
  return '';
}

export default function getCookie() {
  return {
    token: getCookieWithName('token'), deviceType: getCookieWithName('device_type'), deviceName: getCookieWithName('device_name'), deviceSystem: getCookieWithName('device_system'),
  };
}
