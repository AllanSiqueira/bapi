function call(method: string, route: string, context: any) {
    let data = this.routes.find((self: any) => self.method === method && self.label === route);
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

export {call}