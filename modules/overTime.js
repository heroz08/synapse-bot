// 加班
// jb, 加班

import { now, isExist, saveFile, readFile } from '../utils/index.js';

export default async function overtime() {
  const n = now();
  const base = import.meta.url;
  const dirPath = '../data/overtime.json';
  try {
    await isExist(base, dirPath);
    // 存在
    const data = await readFile(base, dirPath);
    const oldData = JSON.parse(data.toString());
    oldData.push({ date: n, work: true });

    const buffer = Buffer.from(JSON.stringify(oldData));
    await saveFile(buffer, base, dirPath);
    return '加班已经记录成功';
  } catch (e) {
    const obj = { date: n, work: true };
    const data = JSON.stringify([obj]);
    const buffer = Buffer.from(data);
    await saveFile(buffer, base, dirPath);
    return '加班已经记录成功';
  }
}
