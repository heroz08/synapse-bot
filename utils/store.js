import { readFile, isExist, saveFile } from './file.js';

const base = import.meta.url;
const path = '../data/store.json';

export async function getStore(key) {
  try {
    await isExist(base, path);
    const resp = await readFile(base, path);
    const data = JSON.parse(resp.toString());
    return data[key];
  } catch (e) {
    return null;
  }
}

export async function setStore(key, value) {
  try {
    await isExist(base, path);
    const resp = await readFile(base, path);
    if (resp.toString()) {
      const data = JSON.parse(resp.toString());
      data[key] = value;
      await saveFile(JSON.stringify(data), base, path);
      return true;
    } else {
      console.log('数据不存在');
      return false;
    }
  } catch (e) {
    console.log('store 不存在！', e);
    return false;
  }
}

export async function initStore() {
  try {
    await isExist(base, path);
  } catch (e) {
    const data = {};
    await saveFile(JSON.stringify(data), base, path);
  }
}