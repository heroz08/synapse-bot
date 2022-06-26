import { client, switchEvent } from './utils/index.js';
import cronsRun from './crons/index.js';

client.on('room.message', switchEvent);

client.start().then(() => console.log('workant 开始工作了! 🥰'));

cronsRun();
