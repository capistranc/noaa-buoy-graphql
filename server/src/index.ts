require("dotenv").config();

import { ApolloServer } from "apollo-server"
import isEmail from "isemail"

import typeDefs from "./type-defs"
import resolvers from "./resolvers";
import { createStore } from "./utils";

import LaunchAPI from "./datasources/launch"
import UserAPI from "./datasources/user";
import { DataSource } from "apollo-datasource";

const internalEngineDemo = require("./engine-demo");

// creates a sequelize connection once. NOT for every request
const store = createStore();

// set up any dataSources our resolvers need
const dataSources:() => any = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

const jwt = require("./auth");

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const token = req.headers.authorization || "";
  const decodedToken = jwt.verifyToken(token);

  if (!decodedToken) return { user: null };
  // if the email isn't formatted validly, return null for user
  // if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email: 'test@test.com' } });
  const user = users && users[0] ? users[0] : null;

  return { user: { ...user, token } };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    ...internalEngineDemo,
  },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== "test") {
  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 app running at ${url}`);
  });
}

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
  server,
};
