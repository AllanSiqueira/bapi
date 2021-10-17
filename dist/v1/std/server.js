"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// class V1Server {
//     public app: any;
//     constructor(info: any, port: number) {
//         this.app = express();
//         this.app.use(express.urlencoded({extended: false}));
//         for(let i = 0; i < info.methods.length; i++) {
//             let self = info.methods[i];
//             switch (self.method) {
//                 case "GET": this.app.get(`/api/${self.label}`, (req: any, res: any) => {
//                     res.json(self.action({req: req, res: res}));
//                 });
//                 case "POST": this.app.post(`/api/${self.label}`, (req: any, res: any) => {
//                     res.json(self.action({req: req, res: res}));
//                 });
//             }
//         }
//         this.app.listen(port, (err?: any) => {
//             if(err) throw err;
//             console.log(`Your app is running on PORT ${port}`);
//         });
//     }
// }
class Server {
    constructor(info, port) {
        let client = info._context;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.urlencoded({ extended: false }));
        client.addListener("*", (context, next) => {
            context.res.json();
        });
        this.app.get("*", (req, res) => {
            let method = client.methods.find((self) => `/api/${self.label}` == req.url);
            if (method)
                client.get(method.label, { req, res });
        });
        this.app.post("*", (req, res) => {
            let method = client.methods.find((self) => `/api/${self.label}` == req.url);
            if (method)
                client.post(method.label, { req, res });
        });
        this.app.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`Your app is running on PORT ${port}`);
        });
    }
}
exports.default = { Server };
//# sourceMappingURL=server.js.map