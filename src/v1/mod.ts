import index = require("./std/index");
import server = require("./std/server");

export = {
    Client: index.default.Client,
    std: {
        Server: server.default.Server
    }
};