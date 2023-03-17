import {GraphQLObjectType, GraphQLSchema} from "graphql/type";

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "RootQuery", fields: {}
})
const RootMutation: GraphQLObjectType = new GraphQLObjectType({
    name: "RootMutation", fields: {}
})

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery, mutation: RootMutation
})

export {
    graphQLSchema
}