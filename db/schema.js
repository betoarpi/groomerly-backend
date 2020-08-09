const {gql} = require('apollo-server');

//Schema
const typeDefs = gql`
    # Types
    type User {
        id: ID
        firstName: String
        lastName: String
        position: String
        email: String
        phone: String
        avatar: String
        role: UserRole
        permissions: UserPermissions
        user: ID
        business: ID
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
        user: ID
        created: String
    }

    type Service {
        id: ID
        name: String
        description: String
        cost: Float
        lengthOfService: Float
        user: ID
        created: String
    }

    type Pet {
        id: ID
        name: String
        petType: String
        breed: String
        picture: String
        user: ID
        created: String
    }

    # Inputs
    input UserInput {
        firstName: String!
        lastName: String!
        position: String
        email: String!
        phone: String!
        avatar: String
        role: UserRole
        permissions: UserPermissions
        password: String!
    }
    
    input EmployeeInput {
        firstName: String!
        lastName: String!
        position: String
        email: String!
        phone: String!
        avatar: String
        role: UserRole
        permissions: UserPermissions
        password: String!
        business: ID!
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

    input ServiceInput {
        name: String!
        description: String!
        cost: Float!
        lengthOfService: Float!
    }

    input PetInput {
        name: String!
        petType: String!
        breed: String!
        picture: String!
    }

    #Enums
    enum UserRole {
        CLIENT
        BUSINESSOWNER
        EMPLOYEE
    }

    enum UserPermissions {
        USER #User client of businesses
        ADMIN #Business Owner
        EMPLOYEE #User for a particular business
        BUSINESSMANAGER #Employee + some admin permissions
        SUPERADMIN #Platform admin with access to all
    }

    # Queries
    type Query {
        # Users
        getUser(token: String!): User

        #getClientUsers

        # Businesses
        getBusinesses: [Business]
        getBusinessById(id: ID!): Business
        getBusinessByName(name: String!): [Business]
        getBusinessByCity(city: String!): [Business] # Need to figure out how to get partial matches?
        getBusinessByZipcode(zipcode: String!): [Business]

        # Services
        getServices: [Service]
        getServiceById(id: ID!): Service
        getServiceByName(name: String!): [Service]

        # Pets
        getPets: [Pet]
        getPetsByUser: [Pet]
        getPetById(id: ID!): Pet

        # Employees
        getEmployees: [User]
        getEmployeesByUser: [User]
        getEmployeeById(id: ID!): User
        getEmployeesByBusinessId(id: ID!): [User]

        # Bookings
    }

    type Mutation {
        # Users
        newUser(input: UserInput): User
        userAuthentication(input: AuthenticationInput): Token

        # Businesses
        newBusiness(input: BusinessInput): Business
        updateBusiness(id: ID!, input: BusinessInput): Business
        deleteBusiness(id: ID!): String

        # Services
        newService(input: ServiceInput): Service
        updateService(id: ID!, input: ServiceInput): Service
        deleteService(id: ID!): String

        # Pets
        newPet(input: PetInput): Pet
        updatePet(id: ID!, input: PetInput): Pet
        deletePet(id: ID!): String

        # Employees
        newEmployee(input: EmployeeInput): User
        updateEmployee(id: ID!, input: EmployeeInput): User
        deleteEmployee(id: ID!): String

        # Bookings
        
    }
`;

module.exports = typeDefs;