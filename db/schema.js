const {gql} = require('apollo-server');

//Schema
const typeDefs = gql`
    type User {
        id: ID
        firstName: String
        lastName: String
        email: String
        phone: String
        avatar: String
        created: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        avatar: String
        password: String!
    }

    type Query {
        getUser: User
    }

    type Mutation {
        newUser(input: UserInput): User
    }
`;

module.exports = typeDefs;