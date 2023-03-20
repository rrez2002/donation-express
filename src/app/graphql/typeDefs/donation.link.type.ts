import {GraphQLObjectType, GraphQLString} from "graphql/type";

const donationLinkType = new GraphQLObjectType({
    name: "donation_link",
    fields: {
        _id: {type: GraphQLString},
        link: {type: GraphQLString},
        amount: {type: GraphQLString}
    }
});

export {
    donationLinkType
}