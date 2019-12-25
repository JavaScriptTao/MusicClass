import axios from 'axios';
import getCookie from '@/tool/cookie';

axios.defaults.timeout = 50000;
axios.defaults.headers.post['Content-Type'] = 'application/json;';

const api = axios.create();
const {
  token, deviceType, deviceName, deviceSystem,
} = getCookie('kplCookie');
axios.interceptors.request.use = api.interceptors.request.use;

api.interceptors.request.use((config) => {
  let defaultToken = '';
  if (token) {
    defaultToken = token;
  } else {
    defaultToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdXNlci53ZWlsYWljaGVuZy5jb20vYXBpL3VzZXJzL2xvZ2luIiwiaWF0IjoxNTUzNTg3Nzg4LCJuYmYiOjE1NTM1ODc3ODgsImp0aSI6InlTZzNJSVFObW5IYjU3SnoiLCJzdWIiOiJlMjI3Y2U4MC04MGQzLTExZTgtYjU4MS1lN2UxYTZiYzQ0YTUiLCJwcnYiOiI5YzQyOWU2YTYwY2Q1Mjg1NDczZjJjOGJjNzAxZWMwOTQ4ZGY0ZDhjIn0.LAwJoTkJaPuv6nuY7CthPCqgD3vCROnJ9qa1f2n020k';
  }
  config.headers.Authorization = defaultToken;
  return config;
}, err => Promise.reject(err));
const isDev = process.env.NODE_ENV === 'development';
const serverHost = isDev ? 'http://www.weilaicheng.com' : 'https://www.kuaipeilian.com';
export default {
  getUrlToToken() {
    return api.get('/api/v2/hello');
  },
  getClassList(params) {
    return api.post('/api/class/list', params);
  },
  getKlassCards(params) {
    const { cardStatus, page } = params;
    return api.get(`/user_zeus/api/v2/card/list?card_status=${cardStatus}&page=${page}`);
  },
  getUnUsedCards(params) {
    const { card_id, direction, page } = params;
    return api.get(`/user_zeus/api/v2/card/logs?card_id=${card_id}&direction=${direction}&page=${page}`);
  },
  getDetailTop(id) {
    return api.get(`/user_zeus/api/v2/card/info?card_id=${id}`);
  },
  getAreacode() {
    return api.get('http://javasite.weilaicheng.com/api/telephone_codes');
  },
  postVerifyCode(params) {
    return api.post(`${serverHost}/api/send_verify_code`, params);
  },
  postReceive(params) {
    return api.post(`${serverHost}/api/new_receive_trial_klass`, params);
  },
  // 预约时间(获取预约的时间)
  getClass(id) {
    return api.get(`${serverHost}/api/receive_results?account_id=${id}`);
  },
  // 提交预约
  postAppointment(params) {
    return api.post(`${serverHost}/api/appointment`, params);
  },
  // 音乐课堂接口
  getUserZeus() {
    return api.get(`/user_zeus/api/v2/music_classroom/index?device_type=${deviceType}&device_name=${deviceName}&device_system=${deviceSystem}`);
  },
  getUserZeusLists(page) {
    return api.get(`/user_zeus/api/v2/music_classroom/list?page=${page}`);
  },
  getUserZeusListsDetail(id) {
    return api.get(`/user_zeus/api/v2/music_classroom/info?music_room_id=${id}`);
  },
};
