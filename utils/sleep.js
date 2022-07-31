import { getStore, setStore } from './store.js';

export async function checkSleepStatus(msg) {
  const status = await getStore('sleep');
  return status ? false : msg;
}

export async function resetSleepStatus() {
  const resp = await setStore('sleep', false);
  if (resp) {
    return false;
  } else {
    return '设置失败';
  }
}


resetSleepStatus();