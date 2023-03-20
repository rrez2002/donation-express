import {GraphQLObjectType, GraphQLString} from "graphql/type";

const userType = new GraphQLObjectType({
    name: "user",
    fields: {
        _id: {type: GraphQLString},
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        fullName: {type: GraphQLString},
        user_name: {type: GraphQLString},
        phone: {type: GraphQLString},
        createdAt: {type: GraphQLString},
        updatedAt: {type: GraphQLString},
    }
});

export {
    userType
}