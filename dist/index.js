"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Client = exports.bapi = void 0;
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
class Client {
    constructor(options) {
        this.listeners = [];
        this.middlewares = [];
        this.routes = [];
        this.options = {};
        if (options)
            this.options = options;
    }
    executeListeners(type, ctx) {
        let listeners = this.listeners.filter(self => self.type === type);
        if (listeners != [])
            listeners.forEach(self => self.action(ctx));
    }
    createRoute(type, route, next) {
        let routes = this.routes.filter(self => self.label == route && self.method == type);
        if (routes.length == 0) {
            let info = {
                label: route,
                method: type,
                action: next
            };
            this.routes.push(info);
            this.executeListeners("createRoute", info);
        }
        else {
            console.error(`[bapi:nonfatal] ${type} ${route} already exists.`);
        }
    }
    use(fn, options) {
        this.middlewares.push({
            fn,
            options
        });
    }
    call(method, route, context) {
        let data = this.routes.find(self => self.method === method && self.label === route);
        if (data) {
            let middlewares = this.middlewares;
            let res = context;
            middlewares.forEach(function (self, index) {
                res = self.fn(res);
            });
            return data.action(res);
        }
        else {
            return {
                error: `Cannot ${method} ${route}`
            };
        }
    }
    get(route, next) {
        this.createRoute("GET", route, next);
    }
    post(route, next) {
        this.createRoute("POST", route, next);
    }
    on(listener, next) {
        this.listeners.push({
            type: listener,
            action: next
        });
    }
}
exports.Client = Client;
function bapi(...args) {
    return new Client(...args);
}
exports.bapi = bapi;
exports.default = bapi;
//# sourceMappingURL=index.js.map