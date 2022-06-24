// 闲鱼
// xy, 闲鱼, xianyu
// id:id; info?:信息

import { saveFile, readFile, isExist } from '../utils/file.js';

export default async function xianyu (...args) {
    const [id, info = { a: 123 }] = args;
    try {
        await isExist(import.meta.url, '../data/xy.json');
        const text = readFile(import.meta.url, '../data/xy.json');
    } catch (err) {
        // console.log(err);
        if (info) {
            const obj = {
                id, info
            };
            const objStr = JSON.stringify(obj);
            await saveFile(objStr, import.meta.url, '../data/xy.json');
        }
    }

    if (info) { // 存

    }
    const obj = {};
    // saveFile();
}

xianyu();
