"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Client {
    constructor(label) {
        this.middlewares = [];
        this.methods = [];
        this.listeners = {
            onCreateMethod: [],
            onAddListener: [],
            onGet: [],
            onPost: [],
            onBuild: []
        };
        this.register = (middleware, options) => {
            this.middlewares.push({
                Constructor: middleware,
                options: options
            }); // these will be ran when API is finished building;
        };
        this.createMethod = (label, method, action) => {
            let exists = this.methods.filter(self => self.label == label);
            if (exists == []) {
                return {
                    status: "failed",
                    error: `Method labeled ${label} already exists.`
                };
            }
            else {
                this.methods.push({
                    label: label,
                    method: method,
                    action: action
                });
                return {
                    status: "success"
                };
            }
        };
        this.addListener = (method, next) => {
            let data = this.methods.find((self) => self.label == method && self.method == 'GET');
            if (method == '*') {
                this.methods.forEach((self, index) => {
                    if (!this.methods[index].listeners)
                        this.methods[index].listeners = [next];
                    else
                        this.methods[index].listeners.push(next);
                });
            }
            else if (data) {
                let index = this.methods.indexOf(data);
                if (!this.methods[index].listeners)
                    this.methods[index].listeners = [next];
                else
                    this.methods[index].listeners.push(next);
            }
            else {
                return {
                    status: "failed",
                    error: `Could not find API method "${method}"`
                };
            }
        };
        this.get = (method, context) => {
            let data = this.methods.find(self => self.label === method && self.method === 'GET');
            if (data) {
                if (data.listeners) {
                    data.listeners.forEach((self, index) => {
                        let next = data.listeners[index];
                        if (next)
                            self.action(context, next);
                        else
                            self.action(context, function (final) {
                                return final;
                            });
                    });
                }
                else {
                    return data.action(context);
                }
            }
            else {
                return {
                    status: "failed",
                    error: `Could not find API method "${method}"`
                };
            }
        };
        this.post = (method, context) => {
            let data = this.methods.find(self => self.label === method && self.method === 'POST');
            if (data) {
                if (data.listeners) {
                    data.listeners.forEach((self, index) => {
                        let next = data.listeners[index];
                        if (next)
                            self.action(context, next);
                        else
                            self.action(context, function (final) {
                                return final;
                            });
                    });
                }
                else {
                    return data.action(context);
                }
            }
            else {
                return {
                    status: "failed",
                    error: `Could not find API method "${method}"`
                };
            }
        };
        this.build = () => {
            let data = {
                label: this.label,
                methods: this.methods,
                _context: this
            };
            this.middlewares.forEach((self) => {
                new self.Constructor(data, self.options);
            });
            return data;
        };
        if (label)
            label = label;
    }
}
exports.default = { Client };
//# sourceMappingURL=index.js.map