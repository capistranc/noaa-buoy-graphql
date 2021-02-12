"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const path = __importStar(require("path"));
require("dotenv").config();
const resolvers_1 = require("./resolvers");
void (async function bootstrap() {
    try {
        const schema = await type_graphql_1.buildSchema({
            resolvers: [resolvers_1.BuoyResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
        });
        const context = async ({ req }) => {
            //Handle token decoding later
            const token = req.headers.authorization;
            // const users = await store.users.findOrCreate({
            //   where: { email: "test@test.com" },
            // });
            const ctx = {
                user: {
                    id: 1,
                    name: "Sample user",
                    roles: ["REGULAR"],
                },
            };
            return ctx;
        };
        const server = new apollo_server_1.ApolloServer({
            schema,
            context,
            // dataSources,
            introspection: true,
            playground: true,
        });
        server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
            console.log(`🚀 app running at ${url}`);
        });
    }
    catch (e) {
        console.log(e);
    }
})();
