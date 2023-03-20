import {graphqlHTTP} from "express-graphql";
import {graphQLSchema} from "../app/graphql/index.graphql";
import {Router} from "express";

const GraphqlRouter: Router = Router()

GraphqlRouter.use("",graphqlHTTP((request, response, graphQLParams) => ({
    schema: graphQLSchema,
    graphiql: true,
    context: {
        request,
        response,
        graphQLParams
    },
})))

export default GraphqlRouter;