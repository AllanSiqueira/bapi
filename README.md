# Bapi v0.1 Documentation

<details open>
<summary>Table of Contents</summary>
<ul style="list-style-type:square">
    <li><a href="#what-is-bapi">What is Bapi?</a></li>
    <li><a href="#how-should-bapi-be-used">How should Bapi be used?</a></li>
	<li><a href="#bapi">Bapi</a></li>
	<ul style="list-style-type:square">
  		<li><a href="#bapi">bapi(options?: object)</a></li>
  </ul>
  <li><a href="#class-client">Class: Client</a></li>
  <ul style="list-style-type:square">
  	<li><a href="#clientusemiddleware-function">client.use(middleware: Function)</a></li>
	<li><a href="#clientcallmethod-string-route-string-context-any">client.call(method: string, route: string, context: any)</a></li>
	<li><a href="#clientget-postroute-string-callback-function">get(route: string, callback: Function)</a></li>
	<li><a href="#clientget-postroute-string-callback-function">post(route: string, callback: Function)</a></li>
	<li><a href="#clientonlistener-string-callback-function">on(listener: string, callback: Function)</a></li>
  </ul>
  <li><a href="#server">Server</a></li>
   <ul style="list-style-type:square">
  	<li><a href="#server">server(client: Client)</a></li>
  </ul>
  <li><a href="#creating-bapi-middlewares">Creating Bapi middlewares</a></li>
</ul>
</details>

### What is Bapi?
✏️  Bapi is an open source versitile NPM package made to create APIs easily and effeciently. Bapi provides an easy to use syntax and easy compatability for use in any kind of API project.

### How should Bapi be used?
While it is possible to create an API that does not run through a server, that probably shouldn't be done... incase you didn't know APIs are to be used in the web to access information from various projects- as well as to allow developers to integrate your program into their code! You can create middleware/plugins to easily integrate any server system. However, Bai omes with a built in Express handler. See [bapi.Server](#) for information regarding it!

### Bapi
Default export for Bapi.
| Argument | Type   | Description            |
|-----------|--------|------------------------|
| Options   | object | Options for API client |


**@Returns** new Client(...)
#### Example
```ts
const bapi = require('bapi');
const client = bapi({version: "v1.0"});
console.log(client.options) // { version: "v1.0" }
```

### Class: Client
General constructor for all things Bapi!
| Argument | Type   | Description            | Stored |
|-----------|--------|------------------------|------------|
| Options   | object | Options for API client | true     |

#### Example
```ts
const {Client} = require('bapi');
const client = new Client({version: "v1.0"});
console.log(client.options); // { version: "v1.0" }
```

#### Methods
- `public` **function use(middleware: Function)**
- `public` **function call(method: string, route: string, context: any)**
- `public` **function get(route: string, callback: Function)**
- `public` **function post(route: string, callback: Function)**
- `public` **function on(listener: string, callback: Function)**

#### Client.use(middleware: Function)
Creates a middleware that is executed every time the `Client.call` method is used. `Function` is passed a `context` parameter that should also be returned after adjustments have been made.

##### Example
```ts
// imports...
client.use(function(ctx: any) {
	ctx.version = "v1.0";
	return ctx;
});
```

#### Client.call(method: string, route: string, context: any)
Calls a created GET or POST request that has been made on the same `Client` constructor.
| Argument | Type   | Description                              |
|-----------|--------|------------------------------------------|
| Method    | string | POST/GET to identify action              |
| Route     | string | API method label/name                    |
| Context   | any    | Context passed to middlewares and action |

#### Example
```ts
// imports...
client.get("version", (context: any) => {
	return { context.name, "version": "v1.0" };
});
client.call("GET", "version", {name: "John"});
```

#### client\[get, post]\(route: string, callback: Function)
Creates an API method which is either a GET or POST request to be handled with a server or middleware. Note: in your callback function, you must return the data you want to be sent in the response.
| Argument | Type     | Description                        |
|----------|----------|------------------------------------|
| Route    | string   | Identifies the route to be created |
| Callback | Function | Handles creating response          |

#### Example
```ts
// imports...
client.get("version", (context: any) => {
	return { context.name, "version": "v1.0" };
});
```

#### client.on(listener: string, callback: Function)
Creates an event listener to be called every time a certain Client action happens.
| Argument | Type     | Description                         |
|----------|----------|-------------------------------------|
| Listener | string   | Identifies the listener to be used  |
| Callback | Function | Action ran when the event is called |

##### Listener Types
| Listener    | Called                                | Passes        |
|-------------|---------------------------------------|---------------|
| createRoute | On client.get(...) & client.post(...) | route: object |

##### Example
```ts
// imports...
client.on("createRoute", (ctx: any) => {
	console.log(`Route ${ctx.label} was created as a ${ctx.method} request and returns ${ctx.action()}`);
});
client.get("test", (ctx: any) => {
	return { "status": "success" }
}); // console log: "Route test was created as a GET request and returns {'status': 'success'}"
```
### Server
Built-in Express server builder.
| Argument  | Type       | Description                |
|-----------|------------|----------------------------|
| Client    | Client | Client to build server for |

**@Returns** Express.Router [(see documentation)](https://expressjs.com/en/guide/routing.html)

#### Example
```ts
const {Client, Serer} = require('bapi');
const client = new Client();
const server = Server(client);

client.get("version", (ctx: any) => { // go to URL loalhost:8080/api/version
	return { version: "v1.0" }
});

server.get("/", (req: any, res: any) => {
	res.send("Hello, world!");
});

server.listen(8080, (err?: any) => {
	if(err) throw err;
	console.log("API running!");
})
```

### Creating Bapi middlewares
Bapi is built to be expendable and easy to use for all developers, thus, it is simple to create middlewares with Bapi

#### Method 1
Build a middleware and export to be used with `Client.use()`. This makes it so that every time `Client.call(...)` is executed your middleware will subsequently be executed with all previous context.

##### Example
```ts
function Middleware(context: any) {
	context.isAuthorized = false;
	return context;
}
export { Middleware }
```

#### Method 2
Build a more plugin-like function or class that uses the Bapi Client as an argument. This is useful for building server builders- like the built-in Express one.

##### Example
```ts
function Server(client: any) {
    const express = require('express');
    const app = express();
	
    client.on('createRoute', (ctx: any, next?: Function) => {
        let fn = (req: any, res: any) => res.json(client.call(ctx.method, ctx.label, {req, res}));
        switch (ctx.method) {
            case "GET": app.get(`/api/${ctx.label}`, fn);
            case "POST": app.post(`/api/${ctx.label}`, fn);
            default: app.get(`/api/${ctx.label}`, fn);
        }
    });
    return app;
}
export {Server}
```