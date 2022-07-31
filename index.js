import { client, switchEvent, initStore } from './utils/index.js';
import cronsRun from './crons/index.js';

async function main() {
  await initStore();

  client.on('room.message', switchEvent);

  client.start().then(() => console.log('workant 开始工作了! 🥰'));

  cronsRun();
}

main();
