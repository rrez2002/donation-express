import {userType} from "../typeDefs/user.type";
import {Request, Response} from "express";
import {AuthGraphQL} from "../middlewares/Auth";

interface GraphQLContext {
    request: Request,
    response: Response
}

export const userResolver = {
    type: userType,
    resolve: async (parent: any, args: any, context: GraphQLContext) => {
        await AuthGraphQL(context.request)
        console.log(context.request.user)
        return context.request.user
    }
};