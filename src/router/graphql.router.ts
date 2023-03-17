import {graphqlHTTP} from "express-graphql";
import {graphQLSchema} from "../app/graphql/index.resolver";
import {Router} from "express";

const GraphqlRouter: Router = Router()

GraphqlRouter.use("",graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
    context: {req: Request, res: Response},

}))

export default GraphqlRouter;