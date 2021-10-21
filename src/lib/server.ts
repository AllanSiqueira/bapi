function Server(client: any) {
    const express = require('express');
    const app = express();

    client.on('createRoute', (ctx: any, next?: Function) => {
        let fn = (req: any, res: any) => res.json(client.call(ctx.method, ctx.label, {req, res}));
        switch (ctx.method) {
            case "GET": app.get(`/api/${ctx.label}`, fn);
            case "POST": app.post(`/api/${ctx.label}`, fn);
            default: app.get(`/api/${ctx.label}`, fn);
        }
    });

    return app;
}

export { Server }