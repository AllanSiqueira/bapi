"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bapi = require("./std/index");
const server = require("./std/server");
const client = new bapi.default.Client("bapi test");
client.register(server.default.Server, 8080);
client.createMethod("list", "GET", (context) => {
    return {
        status: "success",
        data: {
            list: [""]
        }
    };
});
client.build();
//# sourceMappingURL=test.js.map