import {userType} from "../typeDefs/user.type";
import {AuthGraphQL} from "../middlewares/Auth";
import {GraphQLContext} from "../index.graphql";
import UserService from "../../services/user.service";
import {UpdateDTO} from "../../http/dtos/user.dto";
import {GraphQLString} from "graphql/type";
import {messageType} from "../typeDefs/message.type";

const updateUserResolver = {
    type: userType,
    args: {
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        user_name: {type: GraphQLString},
        phone: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parent: any, args: UpdateDTO, context: GraphQLContext) => {
        await AuthGraphQL(context.request)
        await UserService.Update({
            _id: context.request.user._id
        }, args)

        return UserService.FindById({
            _id: context.request.user._id
        },{
            first_name: 1, last_name: 1, user_name: 1, phone: 1,
        });
    }
}

const deleteUserResolver = {
    type: messageType,
    resolve: async (parent: any, args: any, context: GraphQLContext) => {
        await AuthGraphQL(context.request)
        await UserService.Destroy({
            _id: context.request.user._id
        })

        return {
            message: "delete user success"
        };
    }
}

export {
    updateUserResolver,
    deleteUserResolver
}