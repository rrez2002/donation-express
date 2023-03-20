import {GraphQLObjectType, GraphQLString} from "graphql/type";

const authType = new GraphQLObjectType({
    name: "auth",
    fields: {
        token: {type: GraphQLString},
        refreshToken: {type: GraphQLString},
    }
});

export {
    authType
}