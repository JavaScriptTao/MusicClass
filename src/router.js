import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@/views/Home');
const HomeDetail = () => import('@/views/HomeDetail');
const KlassCards = () => import('@/views/KlassCards');
const UnUsedCards = () => import('@/views/UnUsedCards');
const DetailTopTabList = () => import('@/views/DetailTopTabList');

const FreeClass = () => import('@/views/FreeClass');
const Areacode = () => import('@/components/Areacode');
const AboutClass = () => import('@/views/AboutClass');
const Success = () => import('@/views/Success');
const ClassStatus = () => import('@/views/ClassStatus');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { level: 1, title: '互动课堂' },
  },
  {
    path: '/home/:id',
    name: 'homeDetail',
    component: HomeDetail,
    meta: { level: 2, title: '课程详情' },
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: FreeClass,
    meta: { level: 0, title: '免费体验课' },
  },
  {
    path: '/AboutClass',
    name: 'AboutClass',
    component: AboutClass,
    meta: { level: 0, title: '预约体验课' },
  },
  {
    path: '/Success',
    name: 'Success',
    component: Success,
    meta: { level: 0, title: '预约成功' },
  },
  {
    path: '/ClassStatus',
    name: 'ClassStatus',
    component: ClassStatus,
    meta: { level: 0, title: '课程安排' },
  },
  {
    path: '/klassCards',
    name: 'klassCards',
    component: KlassCards,
    meta: { level: 0, title: '课程卡' },
  },
  {
    path: '/unUsedCards',
    name: 'unUsedCards',
    component: UnUsedCards,
    meta: { level: 0, title: '不可用课程卡' },
  },
  {
    path: '/klassCardsDetail/:id',
    name: 'klassCardsDetail',
    component: DetailTopTabList,
    meta: { level: 0, title: '' },
  },
  {
    path: '/detailTopTabList',
    name: 'detailTopTabList',
    component: DetailTopTabList,
    meta: { level: 0, title: '' },
  },
  {
    path: '/Areacode',
    name: 'Areacode',
    component: Areacode,
    meta: { level: 0, title: '选择手机号归属地' },
  },
  ],
});
