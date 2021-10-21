"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Client = exports.bapi = void 0;
const client_1 = require("./lib/client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_1.Client; } });
const server_1 = require("./lib/server");
Object.defineProperty(exports, "Server", { enumerable: true, get: function () { return server_1.Server; } });
function bapi() {
    return new client_1.Client();
}
exports.bapi = bapi;
//# sourceMappingURL=index.js.map