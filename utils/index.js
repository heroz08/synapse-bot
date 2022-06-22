import client from './client.js';
import path from 'path';
import { getDirPathAndFilePath, getModules, readFile } from './file.js';

const basePath = '../modules';
let [instruction, fileLen] = await getInstruction();

// 获取所有module里面文件
async function getInstruction () {
    const instruction = [];
    let fileLen = 0;
    try {
        const files = await getModules(import.meta.url, basePath);
        fileLen = files.length;
        for (let i = 0; i < fileLen; i++) {
            const item = files[i];
            const obj = {
                action: item
            };
            const buffer = await readFile(import.meta.url, `${basePath}/${item}`);
            const text = buffer.toString();
            const lines = text.split('\n');
            const info = lines[0].slice(3);
            const keys = info.split(', ');
            obj.keys = keys;
            instruction.push(obj);
        }
    } catch (err) {
        console.log(err);
    }
    return [instruction, fileLen];
}

// 发送信息
export function sendMsg (roomId, message = '收到了') {
    console.log('准备发送: ', message, '⌛️⌛️⌛️');
    client.sendNotice(roomId, message).then(() => {
        console.log('发送成功! 🥳');
    }).catch(err => console.log('发送失败: 😿', err));
}

// 判断module目录下文件是否变化 如果变化重新获取
async function getNewInstruction () {
    try {
        const files = await getModules(import.meta.url, basePath);
        if (files.length !== fileLen) {
            const [newInstruction, newFileLen] = await getInstruction();
            instruction = newInstruction;
            fileLen = newFileLen;
        }
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

// 处理接收的消息
export async function switchEvent (roomId, event) {
    const { sender, content, type } = event || {};
    if (content?.['msgtype'] !== 'm.text') return;
    if (sender === await client.getUserId()) return;
    const { body } = content || {};
    await getNewInstruction();
    for (let i = 0; i < fileLen; i++) {
        const item = instruction[i];
        const { keys, action } = item;
        if (keys.includes(body)) {
            const { __dirname } = getDirPathAndFilePath(import.meta.url);
            const _path = path.resolve(__dirname, basePath, action);
            const module = await import(_path);
            const result = await module.default();
            sendMsg(roomId, result);
        }
    }
}
