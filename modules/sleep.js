// 睡觉
// sj, 睡觉

import { setStore } from '../utils/index.js';

export default async function sleep() {
  const resp = await setStore('sleep', true);
  return resp ? '设置成功， 今晚不会再提醒' : '设置失败，详情请检查日志';
}