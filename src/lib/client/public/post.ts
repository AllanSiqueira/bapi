function post(route: string, next?: Function) {
    this.createRoute("POST", route, next);
}
export {post}