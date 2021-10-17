import bapi = require('./std/index');
import server = require('./std/server');
import auth = require('./std/auth');

const client = new bapi.default.Client("bapi test");

client.register(server.default.Server, 8080);

client.createMethod("list", "GET", (context: any) => {
    return {
        status: "success",
        data: {
            list: [""]
        }
    }
});

client.build();