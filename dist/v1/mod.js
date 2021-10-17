"use strict";
const index = require("./std/index");
const server = require("./std/server");
module.exports = {
    Client: index.default.Client,
    std: {
        Server: server.default.Server
    }
};
//# sourceMappingURL=mod.js.map