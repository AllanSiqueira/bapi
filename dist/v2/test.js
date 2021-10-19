"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = index_1.bapi(); // returns new Client(...)
const server = index_1.Server(client); // returns Express server
client.use((ctx) => {
    ctx.authorized = true;
    return ctx;
});
client.use((ctx) => {
    ctx.version = "v1.0";
    return ctx;
});
client.get("test", (ctx) => {
    return { "status": "success", data: {
            authorized: ctx.authorized,
            version: ctx.version
        } };
});
server.listen(8080, (err) => {
    if (err)
        throw err;
    console.log('Running!');
});
//# sourceMappingURL=test.js.map