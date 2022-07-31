import { sendMsg, setJob } from '../utils/index.js';
import { roomId } from '../config.js';
import lists from './config.js';

function createJob({ name, schedule, msg, cb }) {
  console.log(name + 'job设置完成');
  const callback = async () => {
    let message = msg;
    if (Array.isArray(msg)) {
      const len = msg.length;
      const index = Math.floor(Math.random() * len);
      message = msg[index];
    }
    if (cb) { // 定时调用其他方法
      const result = await cb(message); // 如果cb返回false不发送消息
      result && sendMsg(roomId, result);
    } else {
      sendMsg(roomId, message);
    }
  };
  setJob(schedule, callback);
}

function cronsRun() {
  lists.forEach(item => {
    createJob(item);
  });
}

export default cronsRun;
