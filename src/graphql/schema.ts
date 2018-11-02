import { makeExecutableSchema } from 'graphql-tools';
import { Mutation } from './mutation';
import { Query } from './query';
const SchemaDefeinition = `
    type Schema{
        query:Query
        mutantion:Mutation
    }
`;
export default makeExecutableSchema({
	typeDefs: [ SchemaDefeinition, Mutation, Query ]
});
