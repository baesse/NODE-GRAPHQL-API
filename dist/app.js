"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const graphqlHttp = require("express-graphql");
const index_1 = require("./models/index");
const schema_1 = require("./graphql/schema");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        (req, res, next) => {
            req['context'] = {};
            req['context'].db = index_1.default;
            next();
        };
        this.express.use('/graphql', graphqlHttp((req) => ({
            schema: schema_1.default,
            graphiql: true,
            context: req['context']
        })));
    }
}
exports.default = new App().express;
