import {bapi, Server} from "./index";

const client: any = bapi(); // returns new Client(...)
const server: any = Server(client); // returns Express server

client.get("test", (ctx: any) => {
    return { "status": "success" }
});

server.listen(8080, (err?: any) => {
    if(err) throw err;
    console.log('Running!');
});