"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
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
//# sourceMappingURL=client.js.map