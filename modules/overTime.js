// 加班
// jb, 加班

import { now, isExist, saveFile, readFile } from '../utils/index.js';

export default async function overtime () {
    const n = now();
    try {
        await isExist(import.meta.url, '../data/overtime.json');
        // 存在
        const data = await readFile(import.meta.url, '../data/overtime.json');
        const oldData = JSON.parse(data.toString());
        oldData.push({ date: n, work: true });

        const buffer = Buffer.from(JSON.stringify(oldData));
        await saveFile(buffer, import.meta.url, '../data/overtime.json');
        return '加班已经记录成功';
    } catch (e) {
        const obj = { date: n, work: true };
        const data = JSON.stringify([obj]);
        const buffer = Buffer.from(data);
        await saveFile(buffer, import.meta.url, '../data/overtime.json');
        return '加班已经记录成功';
    }
}
