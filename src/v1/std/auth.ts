// import jwt = require('jsonwebtoken');

class Authorizer {
    constructor(info: any) {
        let client = info._context;

        client.addListener('*', (context: any, next: Function) => {
            context.authorized = false;
            next(context);
        });
    }
}

export default Authorizer;