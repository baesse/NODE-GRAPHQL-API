"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const mutation_1 = require("./mutation");
const query_1 = require("./query");
const user_schema_1 = require("./resources/user/user.schema");
const post_schema_1 = require("./resources/post/post.schema");
const comment_schema_1 = require("./resources/comment/comment.schema");
const SchemaDefeinition = `
    type Schema{
        query:Query
        mutantion:Mutation
    }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [SchemaDefeinition, mutation_1.Mutation, query_1.Query, user_schema_1.UserTypes, post_schema_1.postTypes, comment_schema_1.commentTypes]
});
