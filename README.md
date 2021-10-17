# Bapi
> Currently not published to NPM

### Installation
```
git clone https://github.com/bapi-js/bapi.git node_modules/bapi
```

### Guide
#### With ES6
```js
const bapi = require('bapi');
const client = bapi();
const server = bapi.server(client);

client.get('get', context => {
    let something; // grab data from db
    return {
        status: "success",
        data: {
            something: something
        }
    }
});

client.post('register', context => {
    let {req, res} = context; // these properties are passed when executed thru bapi-server
    if(req && res) {
        // write to db
        return {
            status: "success"
        }
    } else {
        return {
            status: "failed",
            error: "Must be executed by a server request."
        }
    }
});

server.listen(8080, err => {
    // ...
});
```

#### With Typescript
```ts
import {bapi, server} from 'bapi';
const client = bapi();
const server = server(client);

client.get('get', (context?: any) => {
    let something; // grab data from db
    return {
        status: "success",
        data: {
            something: something
        }
    }
});

client.post('register', (context?: any) => {
    let {req, res} = context; // these properties are passed when executed thru bapi-server
    if(req && res) {
        // write to db
        return {
            status: "success"
        }
    } else {
        return {
            status: "failed",
            error: "Must be executed by a server request."
        }
    }
});

server.listen(8080, (err?: any) => {
    // ...
});
```

#### Executing
Run your scipt, then visit `http://localhost:8080/api/get` to run your api method 'get.' Note: bapi server is built on express and returns an express router, thus can be used for creating additonal GET requests. For example:

```js
// ... see above

server.get('/', (req, res) => {
   res.send("hello!"); 
});
```