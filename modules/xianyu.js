// 闲鱼
// xy, 闲鱼, xianyu
// id:id; info?:信息

import { saveFile, readFile, isExist } from '../utils/file.js';

export default async function xianyu (...args) {
    const [id, ...extArgs] = args;
    const info = extArgs.join(' ')
    try {
        await isExist(import.meta.url, '../data/xy.json');
        const text = await readFile(import.meta.url, '../data/xy.json');
        const textInfo = JSON.parse(text.toString())
        if(extArgs.length){ // info存在 文件也存在
            const isHas = textInfo.find(item => item.id === id)
            if(isHas) {
                return '信息已经存在'
            } else {
                textInfo.push({ id, info })
                return save(textInfo)
            }
        } else {
            const isHas = textInfo.find(item => item.id === id)
            if(!isHas) {
                return '信息不存在'
            } else {
                return isHas.info
            }
        }
    } catch (err) {
        if (extArgs.length) { // 文件名不存在 info存在
            const obj = {
                id, info
            };
            const arr = []
            arr.push(obj)
            return save(arr)
        }
    }
}

async function save(obj){
    const objStr = JSON.stringify(obj);
    const buffer = Buffer.from(objStr)
    const res = await saveFile(buffer, import.meta.url, '../data/xy.json');
    return res ? '信息保存失败' : '信息保存成功'
}

// xianyu();
