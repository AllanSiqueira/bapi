function get(route: string, next: Function) {
    this.createRoute("GET", route, next);
}
export {get};