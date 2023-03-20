import {GraphQLString} from "graphql/type";
import AuthService from "../../services/auth.service";
import {LoginDTO, RegisterDTO} from "../../http/dtos/auth.dto";
import {authType} from "../typeDefs/auth.type";

const registerResolver = {
    type: authType,
    args: {
        first_name: {type: GraphQLString},
        last_name: {type: GraphQLString},
        user_name: {type: GraphQLString},
        phone: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parent: any, args: RegisterDTO) => {
        try {
            const {token, refreshToken} = await AuthService.Register(args)
            return {
                token,
                refreshToken
            }
        }catch (e) {
            throw (e as Error).message
        }
    }
};

const loginResolver = {
    type: authType,
    args: {
        user_name: {type: GraphQLString},
        password: {type: GraphQLString},
    },
    resolve: async (parent: any, args: LoginDTO) => {
        try {
            const {token, refreshToken} = await AuthService.Login(args)
            return {
                token,
                refreshToken
            }
        }catch (e) {
            throw (e as Error).message
        }
    }
};
const refreshTokenResolver = {
    type: authType,
    args: {
        token: {type: GraphQLString},
    },
    resolve: async (parent: any, args: { token:string }) => {
        try {
            const {token, refreshToken} = await AuthService.RefreshToken(args.token)
            return {
                token,
                refreshToken,
            }
        }catch (e) {
            throw (e as Error).message
        }
    }
};

export {
    registerResolver,
    loginResolver,
    refreshTokenResolver,
}