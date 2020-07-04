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

    type Token {
        token: String
    }

    input UserInput {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        avatar: String
        password: String!
    }

    input AuthenticationInput {
        email: String!
        password: String!
    }

    type Query {
        getUser(token: String!): User
    }

    type Mutation {
        newUser(input: UserInput): User
        userAuthentication(input: AuthenticationInput): Token
    }
`;

module.exports = typeDefs;