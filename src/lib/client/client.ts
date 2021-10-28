import{call, get, on, post, use} from './public/.';
import {executeListeners, createRoute} from './private/.';

class Client {
    public listeners: any[] = [];
    public middlewares: any[] = [];
    public routes: any[] = [];
    public options: any = {};

    constructor(options?: any) {
        if(options) this.options = options;

        this.executeListeners.bind(this);
        this.createRoute.bind(this);
        this.use.bind(this);
        this.call.bind(this);
        this.get.bind(this);
        this.post.bind(this);
        this.on.bind(this);
    }

    private executeListeners = executeListeners;
    private createRoute = createRoute;

    public use = use;
    public call = call;
    public get = get;
    public post = post;
    public on = on;
}
export {Client}
