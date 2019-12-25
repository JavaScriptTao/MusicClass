// 引用神策
import sensors from 'sa-sdk-javascript';

const isDev = process.env.NODE_ENV === 'development';

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

sensors.init({
  // server_url: 'http://sensorsdata.kuaipeilian.com:8106/sa?project=production',
  server_url: isDev ? 'http://sensorsdata.kuaipeilian.com:8106/sa?project=default' : 'http://sensorsdata.kuaipeilian.com:8106/sa?project=production',
  // server_url: 'https://sensorsdata.kuaipeilian.com/sa?project=production',
  // heatmap_url神策分析中点击分析及触达分析功能代码，代码生成工具会自动生成。如果神策代码中 `sensorsdata.min.js` 版本是 1.9.1 及以上版本，这个参数必须配置，低于此版本不需要配置。
  heatmap_url: './heatmap.min.js', // '在 github 下载新版本的 heatmap.min.js ',
  heatmap: {
    // 是否开启点击图，默认 default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭
    // 需要 JSSDK 版本号大于 1.7
    clickmap: 'default',
    // 是否开启触达注意力图，默认 default 表示开启，自动采集 $WebStay 事件，可以设置 'not_collect' 表示关闭
    // 需要 JSSDK 版本号大于 1.9.1
    scroll_notice_map: 'not_collect',
    send_type: 'ajax',
    show_log: isDev,
  },
});
if (getCookieWithName('user_id')) {
  sensors.login(getCookieWithName('user_id'));
}
sensors.quick('autoTrack');

export default function sendEvent(id, param) {
  sensors.track(id, param);
}
