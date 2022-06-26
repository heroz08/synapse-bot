import { sendMsg, setJob } from '../utils/index.js';
import { roomId } from '../config.js';
import lists from './config.js';

function createJob ({ name, schedule, msg }) {
    console.log(name + 'job设置完成');
    const callback = () => {
        sendMsg(roomId, msg);
    };
    setJob(schedule, callback);
}

function cronsRun () {
    lists.forEach(item => {
        createJob(item);
    });
}

export default cronsRun;
