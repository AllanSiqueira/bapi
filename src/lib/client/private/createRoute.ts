function createRoute(type: string, route: string, next: Function) {
    let routes = this.routes.filter((self: any) => self.label==route && self.method==type);
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

export {createRoute}