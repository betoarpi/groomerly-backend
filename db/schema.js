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

    type Business {
        id: ID
        name: String
        address: String
        address2: String
        city: String
        state: String
        country: String
        zipcode: String
        longitude: String
        latitude: String
        phone: String
        hours: String
        coverPicture: String
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

    input AuthenticationInput {
        email: String!
        password: String!
    }

    input BusinessInput {
        name: String!
        address: String!
        address2: String
        city: String!
        state: String
        country: String!
        zipcode: String!
        longitude: String!
        latitude: String!
        phone: String!
        hours: String!
        coverPicture: String
    }

    type Query {
        # Users
        getUser(token: String!): User

        #Businesses
        getBusinesses: [Business]
        getBusinessById(id: ID!): Business
        getBusinessByName(name: String!): [Business]
        getBusinessByCity(city: String!): [Business] #How to get partial matches?
        getBusinessByZipcode(zipcode: String!): [Business]
    }

    type Mutation {
        # Users
        newUser(input: UserInput): User
        userAuthentication(input: AuthenticationInput): Token

        # Businesses
        newBusiness(input: BusinessInput): Business
        updateBusiness(id: ID!, input: BusinessInput): Business
        deleteBusiness(id: ID!) : String
    }
`;

module.exports = typeDefs;