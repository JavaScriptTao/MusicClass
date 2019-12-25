const u = navigator.userAgent;
const app = navigator.appVersion;
const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;

export function sendShareInfo2Native(param) {
  if (isAndroid) {
    window.kpl && window.kpl.getShareInfo && window.kpl.getShareInfo(JSON.stringify(param));
  } else {
    window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getShareInfo && window.webkit.messageHandlers.getShareInfo.postMessage(param);
  }
}
