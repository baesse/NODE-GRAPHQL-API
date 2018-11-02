import { makeExecutableSchema } from 'graphql-tools';
import { Mutation } from './mutation';
import { Query } from './query';
import { UserTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comment/comment.schema';
const SchemaDefeinition = `
    type Schema{
        query:Query
        mutantion:Mutation
    }
`;
export default makeExecutableSchema({
	typeDefs: [ SchemaDefeinition, Mutation, Query, UserTypes, postTypes,commentTypes ]
});
