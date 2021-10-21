import {bapi, Server} from ".";

const client: any = bapi(); // returns new Client(...)
const server: any = Server(client); // returns Express server

client.use((ctx: any) => {
    ctx.authorized = true;
    return ctx;
});

client.use((ctx: any) => {
    ctx.version = "v1.0";
    return ctx;
});

client.get("test", (ctx: any) => {
    return { "status": "success", data: {
        authorized: ctx.authorized,
        version: ctx.version
    } }
});

server.listen(8080, (err?: any) => {
    if(err) throw err;
    console.log('Running!');
});