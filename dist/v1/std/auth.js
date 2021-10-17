"use strict";
// import jwt = require('jsonwebtoken');
Object.defineProperty(exports, "__esModule", { value: true });
class Authorizer {
    constructor(info) {
        let client = info._context;
        client.addListener('*', (context, next) => {
            context.authorized = false;
            next(context);
        });
    }
}
exports.default = Authorizer;
//# sourceMappingURL=auth.js.map