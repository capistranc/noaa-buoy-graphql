import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import * as path from "path";
import { Context, IRequest } from "./utils/types";
require("dotenv").config();

import { BuoyResolver } from "./resolvers";
import { authChecker } from "./utils/authChecker";

void (async function bootstrap() {
  try {
    const schema = await buildSchema({
      resolvers: [BuoyResolver],
      emitSchemaFile: path.resolve(__dirname, "schema.gql"),
      // authChecker,
    });

    const context = async ({ req }: IRequest) => {
      //Handle token decoding later
      const token = req.headers.authorization;

      // const users = await store.users.findOrCreate({
      //   where: { email: "test@test.com" },
      // });

      const ctx: Context = {
        user: {
          id: 1,
          name: "Sample user",
          roles: ["REGULAR"],
        },
      };

      return ctx;
    };

    const server = new ApolloServer({
      schema,
      context,
      // dataSources,
      introspection: true,
      playground: true,
      // formatError: (err) => {},
    });

    server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
      console.log(`🚀 app running at ${url}`);
    });
  } catch (e) {
    console.log(e);
  }
})();
