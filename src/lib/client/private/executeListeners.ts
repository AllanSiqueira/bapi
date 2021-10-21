const executeListeners = function(type: string, ctx: any) {
    let listeners = this.listeners.filter((self: any) => self.type === type);
    if(listeners != []) listeners.forEach((self: any) => self.action(ctx));
}
export {executeListeners}