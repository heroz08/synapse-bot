import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
} from 'matrix-bot-sdk';
import { homeServerUrl, accessToken } from '../config.js';

const storage = new SimpleFsStorageProvider('../bot.json');
const client = new MatrixClient(homeServerUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

export default client;
