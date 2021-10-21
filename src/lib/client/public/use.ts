function use(fn: Function, options?: any) {
    this.middlewares.push({
        fn,
        options
    });
}
export {use}