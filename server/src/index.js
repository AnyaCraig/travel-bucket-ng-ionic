require('dotenv').config();
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const CountryAPI = require('./datasources/countries');

const server = new ApolloServer({ 
  typeDefs,  
  resolvers,
  dataSources: () => ({
    countryAPI: new CountryAPI(),
  }) 
});

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/dev
  `);
});