import { readFile, isExist, saveFile } from './file.js';

export default async function readAndSaveFile(base, dirPath, _data, callback) {
  let finalData;
  try {
    await isExist(base, dirPath);
    // 存在
    const data = await readFile(base, dirPath);
    const oldData = JSON.parse(data.toString());
    const isArray = Array.isArray(oldData);
    const finallData = callback ? callback(oldData) : (isArray ? [...oldData, ..._data] : { ...oldData, ..._data }); // 通过回调更新数据

    finalData = Buffer.from(JSON.stringify(finallData));
  } catch (e) {
    const data = JSON.stringify(_data);
    finalData = Buffer.from(data);
  }
  if (finalData) {
    await saveFile(finalData, base, dirPath);
    return true;
  }
  return false;
}