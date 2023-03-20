import {GraphQLObjectType, GraphQLSchema} from "graphql/type";
import {userResolver} from "./queries/user.resolver";
import {donationLinkResolver, donationLinksResolver} from "./queries/donation.link.resolver";
import {loginResolver, refreshTokenResolver, registerResolver} from "./mutations/auth.resolver";
import {createDonationLinkResolver} from "./mutations/donation.link.resolver";
import {Request, Response} from "express";
import {gatewayResolver} from "./mutations/payment.resolver";
import {deleteUserResolver, updateUserResolver} from "./mutations/user.resolver";
import {GraphQLParams} from "express-graphql";

export interface GraphQLContext {
    request: Request,
    response: Response,
    graphQLParams: GraphQLParams
}

const RootQuery: GraphQLObjectType = new GraphQLObjectType({
    name: "RootQuery", fields: {
        user: userResolver,
        donationLinks: donationLinksResolver,
        donationLink: donationLinkResolver,
        gateway: gatewayResolver,
    }
})
const RootMutation: GraphQLObjectType = new GraphQLObjectType({
    name: "RootMutation", fields: {
        register: registerResolver,
        login: loginResolver,
        refreshToken: refreshTokenResolver,
        updateUser: updateUserResolver,
        deleteUser: deleteUserResolver,
        createDonationLink: createDonationLinkResolver
    }
})

const graphQLSchema: GraphQLSchema = new GraphQLSchema({
    query: RootQuery, mutation: RootMutation
})

export {
    graphQLSchema
}