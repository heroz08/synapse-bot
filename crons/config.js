import { checkSleepStatus, resetSleepStatus } from '../utils/index.js';

const lists = [ // 新增 cb属性 扩展定时执行某任务方法
  {
    name: 'overtime', schedule: '0 30 18 * * 1,2,3,4,5', msg: '今天加班吗？'
  },
  {
    name: 'water', schedule: '0 30 10,11,13,14,15,16,17 * * 1,2,3,4,5', msg: [
      '确定不来一杯吗 该喝水了',
      '坐的太久了起来运动一下',
      '工作了很久了起来摸摸鱼吧'
    ]
  },
  {
    name: 'tips', schedule: '0 15 8 * * 1,2,3,4,5', msg: [
      '准备出门了',
      '再不出门会迟到的',
    ]
  },
  {
    name: 'sleep', schedule: '0 30,50 22,23 * * 0,1,2,3,4,5,6', msg: [
      '该睡觉了',
      '几点了还不睡，想修仙啊',
      '再不睡觉又要长肉了',
      '你不睡觉 我就一直提醒'
    ],
    cb: checkSleepStatus
  },
  {
    name: 'resetSleep', schedule: '0 0 20 * * 0,1,2,3,4,5,6',
    cb: resetSleepStatus
  }
];

export default lists;
