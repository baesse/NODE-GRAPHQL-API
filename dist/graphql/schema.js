"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const mutation_1 = require("./mutation");
const query_1 = require("./query");
const user_schema_1 = require("./resources/user/user.schema");
const post_schema_1 = require("./resources/post/post.schema");
const comment_schema_1 = require("./resources/comment/comment.schema");
const lodash_1 = require("lodash");
const comment_resolvers_1 = require("./resources/comment/comment.resolvers");
const post_resolvers_1 = require("./resources/post/post.resolvers");
const user_resolvers_1 = require("./resources/user/user.resolvers");
const resolvers = lodash_1.merge(comment_resolvers_1.commentResolvers, post_resolvers_1.postResolvers, user_resolvers_1.userResolvers);
const SchemaDefeinition = `
    type Schema{
        query:Query
        mutantion:Mutation
    }
`;
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [SchemaDefeinition, mutation_1.Mutation, query_1.Query, user_schema_1.UserTypes, post_schema_1.postTypes, comment_schema_1.commentTypes], resolvers: resolvers
});
