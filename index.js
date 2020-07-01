const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const databaseConection = require('./config/db');

//connect to the database
databaseConection();

//server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//start server
server.listen().then(({ url }) => {
    console.log(`The server is up and running at: ${url}`);
});