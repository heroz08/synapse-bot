import fsp from 'fs/promises';
import path from 'path';
import url from 'url';
import fs from 'fs';

export function getDirPathAndFilePath (fileUrl) {
    const __filename = url.fileURLToPath(fileUrl);
    const __dirname = path.dirname(__filename);
    return { __filename, __dirname };
}

export async function getModules (currentPath, dirPath) {
    const { __dirname } = getDirPathAndFilePath(currentPath);
    const _path = path.resolve(__dirname, dirPath);
    return await fsp.readdir(_path);
}

export async function readFile (currentPath, dirPath) {
    const { __dirname } = getDirPathAndFilePath(currentPath);
    const _path = path.resolve(__dirname, dirPath);
    return await fsp.readFile(_path);
}

export async function saveFile (data, currentPath, dirPath) {
    const { __dirname } = getDirPathAndFilePath(currentPath);
    const _path = path.resolve(__dirname, dirPath, 'xy.json');
    const writeSteam = fs.createWriteStream(_path);
    data.pipe(writeSteam);
    return await new Promise((resolve, reject) => {
        writeSteam.on('finish', () => {
            resolve('save finish');
        });
        writeSteam.on('error', () => {
            reject('save error');
        });
    });

}

export async function isExist (currentPath, pathName) {
    const { __dirname } = getDirPathAndFilePath(currentPath);
    const _path = path.resolve(__dirname, pathName);
    return await fsp.access(_path);
}

