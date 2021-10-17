import express from "express";

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
    public app: any;
    constructor(info: any, port: number) {
        let client = info._context;

        this.app = express();
        this.app.use(express.urlencoded({extended: false}));

        client.addListener("*", (context: any, next?: Function) => {
            context.res.json();
        })

        this.app.get("*", (req: any, res: any) => {
            let method = client.methods.find((self: any) => `/api/${self.label}` == req.url);
            if(method) client.get(method.label, {req, res});
        });

        this.app.post("*", (req: any, res: any) => {
            let method = client.methods.find((self: any) => `/api/${self.label}` == req.url);
            if(method) client.post(method.label, {req, res});
        })

        this.app.listen(port, (err?: any) => {
            if(err) throw err;
            console.log(`Your app is running on PORT ${port}`);
        });
    }
}

export default { Server };