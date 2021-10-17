"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = exports.Client = exports.bapi = void 0;
function Server(client) {
    const express = require('express');
    const app = express();
    client.on('createRoute', (ctx, next) => {
        let fn = (req, res) => res.json(ctx.action({ req, res }));
        switch (ctx.type) {
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
    // public use(fn: Function, options?: any) {}
    // public call(method: string, route: string, next?: Function) {}
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