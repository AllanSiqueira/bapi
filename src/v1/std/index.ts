class Client {

    private middlewares: any[] = [];
    private methods: any[] = [];
    private label: string;

    private listeners: object = {
        onCreateMethod: [],
        onAddListener: [],
        onGet: [],
        onPost: [],
        onBuild: []
    }

    constructor(label?: string) {
        if(label) label = label;
    }

    public register: Function = (middleware: Function, options?: any) => {
        this.middlewares.push({
            Constructor: middleware,
            options: options
        }) // these will be ran when API is finished building;
    }

    public createMethod: Function = (label: string, method: string, action: Function) => {
        let exists: any = this.methods.filter(self => self.label == label);
        if(exists == []) {
            return {
                status: "failed",
                error: `Method labeled ${label} already exists.`
            }
        } else {
            this.methods.push({
                label: label,
                method: method,
                action: action
            });
            return {
                status: "success"
            }
        }
    }

    public addListener: Function = (method: string, next: Function) => {
        let data: any = this.methods.find((self: any) => self.label == method && self.method == 'GET');
        if(method == '*') {
            this.methods.forEach((self: any, index: number) => {
                if(!this.methods[index].listeners) this.methods[index].listeners = [next];
                else this.methods[index].listeners.push(next);
            });
        } else if (data) {
            let index = this.methods.indexOf(data);
            if(!this.methods[index].listeners) this.methods[index].listeners = [next];
            else this.methods[index].listeners.push(next);
        } else {
            return {
                status: "failed",
                error: `Could not find API method "${method}"`
            }
        }
    }

    public get: Function = (method: string, context: any) => {
        let data: any = this.methods.find(self => self.label === method && self.method === 'GET');
        if(data) {
            if(data.listeners) {
                data.listeners.forEach((self: any, index: number) => {
                    let next = data.listeners[index];
                    if(next) self.action(context, next);
                    else self.action(context, function(final: any) {
                        return final;
                    });
                });
            } else {
                return data.action(context);
            }
        } else {
            return {
                status: "failed",
                error: `Could not find API method "${method}"`
            }
        }
    }

    public post: Function = (method: string, context: any) => {
        let data: any = this.methods.find(self => self.label === method && self.method === 'POST');
        if(data) {
            if(data.listeners) {
                data.listeners.forEach((self: any, index: number) => {
                    let next = data.listeners[index];
                    if(next) self.action(context, next);
                    else self.action(context, function(final: any) {
                        return final;
                    });
                });
            } else {
                return data.action(context);
            }
        } else {
            return {
                status: "failed",
                error: `Could not find API method "${method}"`
            }
        }
    }

    public build: Function = () => {
        let data: any = {
            label: this.label,
            methods: this.methods,
            _context: this
        };

        this.middlewares.forEach((self: any) => {
            new self.Constructor(data, self.options);
        });

        return data;
    }
}

export default { Client };