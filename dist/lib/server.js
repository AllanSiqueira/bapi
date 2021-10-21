"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
function Server(client) {
    const express = require('express');
    const app = express();
    client.on('createRoute', (ctx, next) => {
        let fn = (req, res) => res.json(client.call(ctx.method, ctx.label, { req, res }));
        switch (ctx.method) {
            case "GET": app.get(`/api/${ctx.label}`, fn);
            case "POST": app.post(`/api/${ctx.label}`, fn);
            default: app.get(`/api/${ctx.label}`, fn);
        }
    });
    return app;
}
exports.Server = Server;
//# sourceMappingURL=server.js.map