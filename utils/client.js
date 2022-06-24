import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
} from 'matrix-bot-sdk';
import path from 'path';
import { homeServerUrl, accessToken } from '../config.js';
import { getDirPathAndFilePath } from './file.js';

const { __dirname } = getDirPathAndFilePath(import.meta.url);
const storage = new SimpleFsStorageProvider(path.resolve(__dirname, '../bot.json'));
const client = new MatrixClient(homeServerUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

export default client;
