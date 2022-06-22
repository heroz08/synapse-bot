import client from './utils/client.js';
import { switchEvent } from './utils/index.js';

client.on('room.message', switchEvent);

client.start().then(() => console.log('workant 开始工作了! 🥰'));
