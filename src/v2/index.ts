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

class Client {
    private listeners: any[] = [];
    private middlewares: any[] = [];
    public routes: any[] = [];
    public options: any = {};
   
    constructor(options?: any) {
        if(options) this.options = options;
    }

    private executeListeners(type: string, ctx: any) {
        let listeners = this.listeners.filter(self => self.type === type);
        if(listeners != []) listeners.forEach(self => self.action(ctx));
    }

    private createRoute(type: string, route: string, next: Function) {
        let routes = this.routes.filter(self => self.label==route && self.method==type);
        if(routes.length==0) {
            let info = {
                label: route,
                method: type,
                action: next
            }
            this.routes.push(info);
            this.executeListeners("createRoute", info);
        } else {
            console.error(`[bapi:nonfatal] ${type} ${route} already exists.`);
        }
    }

    public use(fn: Function, options?: any) {
        this.middlewares.push({
            fn,
            options
        });
    }
    
    public call(method: string, route: string, context: any) {
        let data = this.routes.find(self => self.method === method && self.label === route);
        if(data) {
            let middlewares = this.middlewares;
            let res = context;
            middlewares.forEach(function(self: any, index: number) {
                res = self.fn(res);
            });
            return data.action(res);
        }
        else {
            return {
                error: `Cannot ${method} ${route}`
            }
        }
    }

    public get(route: string, next: Function) {
        this.createRoute("GET", route, next);
    }
    public post(route: string, next?: Function) {
        this.createRoute("POST", route, next);
    }
    public on(listener: string, next: Function) {
        this.listeners.push({
            type: listener,
            action: next
        });
    }
    // public build() {}
}

function bapi(...args: any) {
    return new Client(...args);
}

export default bapi;
export {bapi, Client, Server}