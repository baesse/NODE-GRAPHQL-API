import { makeExecutableSchema } from 'graphql-tools';
import { Mutation } from './mutation';
import { Query } from './query';
import { UserTypes } from './resources/user/user.schema';
import { postTypes } from './resources/post/post.schema';
import { commentTypes } from './resources/comment/comment.schema';
import { merge } from 'lodash';
import { commentResolvers } from './resources/comment/comment.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { userResolvers } from './resources/user/user.resolvers';
const resolvers = merge(commentResolvers, postResolvers, userResolvers);

const SchemaDefeinition = `
    type Schema{
        query:Query
        mutantion:Mutation
    }
`;
export default makeExecutableSchema({
	typeDefs: [ SchemaDefeinition, Mutation, Query, UserTypes, postTypes, commentTypes ],resolvers:resolvers
});
