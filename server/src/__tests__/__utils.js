/** 
 * These tests come from the GraphQL/Apollo Fullstack Tutorial, which allows users
to book launch tickets with SpaceX. I modified the server from that tutorial to use
in this app. I am leaving these tests in as examples in case someone wants to continue 
this app by writing tests for it, but these particular tests do not apply 
to the Travel Bucket app
*/

const { HttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { execute, toPromise } = require('apollo-link');

module.exports.toPromise = toPromise;

const {
  dataSources,
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
} = require('../');

/**
 * Integration testing utils
 */
const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ store });
  const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, launchAPI }),
    context,
  });

  return { server, userAPI, launchAPI };
};

module.exports.constructTestServer = constructTestServer;

/**
 * e2e Testing Utils
 */

const startTestServer = async server => {
  // if using apollo-server-express...
  // const app = express();
  // server.applyMiddleware({ app });
  // const httpServer = await app.listen(0);

  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};

module.exports.startTestServer = startTestServer;
