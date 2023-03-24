import {userType} from "../typeDefs/user.type";
import {AuthGraphQL} from "../middlewares/Auth";
import {GraphQLContext} from "../index.graphql";

export const userResolver = {
    type: userType,
    resolve: async (parent: any, args: any, context: GraphQLContext) => {
        await AuthGraphQL(context.request)
        console.log(context.request.user)
        return context.request.user
    }
};