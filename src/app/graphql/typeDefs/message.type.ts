import {GraphQLObjectType, GraphQLString} from "graphql/type";

const messageType = new GraphQLObjectType({
    name: "message",
    fields: {
        message: {type: GraphQLString},
    }
});

export {
    messageType
}
