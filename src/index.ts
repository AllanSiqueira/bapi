import {Client} from './lib/client';
import {Server} from './lib/server';

function bapi() {
    return new Client();
}

export {bapi, Client, Server}