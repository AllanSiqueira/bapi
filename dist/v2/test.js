"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const client = (0, index_1.bapi)(); // returns new Client(...)
const server = (0, index_1.Server)(client); // returns Express server
client.get("test", (ctx) => {
    return { "status": "success" };
});
server.listen(8080, (err) => {
    if (err)
        throw err;
    console.log('Running!');
});
//# sourceMappingURL=test.js.map