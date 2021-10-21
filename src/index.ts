import {Client} from './lib/client/client';
import {Server} from './lib/server';

function bapi() {
    return new Client();
}

export {bapi, Client, Server}